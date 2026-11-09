#!/usr/bin/env python3
"""verify-dbat-dicht.py — controleert dat DBAT dicht is (nov 2026).

Elke gebouwde pagina (dist/client), elke URL uit de oude sitemap en een paar
verzonnen paden moeten een 301 geven naar www.aiplatformmkb.nl of
www.hetlaatsteainieuws.nl, en elk doel moet direct 200 geven (geen keten).
robots.txt, de sitemaps en favicons moeten 200 blijven.

Gebruik (na npm run build):
  python3 -I scripts/verify-dbat-dicht.py . http://127.0.0.1:8788 /tmp   # lokaal met wrangler dev
  python3 -I scripts/verify-dbat-dicht.py . https://debesteaitools.nl /tmp   # live, na de deploy
Argumenten: <repo-map> <basis-URL> <map voor het json-rapport>.
"""
import sys,os,re,urllib.request,urllib.error,json
from concurrent.futures import ThreadPoolExecutor
from collections import Counter
W=sys.argv[1]; BASE=sys.argv[2]; S=sys.argv[3]
paths=set()
for root,dirs,files in os.walk(W+'/dist/client'):
    for f in files:
        if f=='index.html' or (f.endswith('.html') and f!='404.html'):
            p=os.path.relpath(os.path.join(root,f),W+'/dist/client')
            p='/'+re.sub(r'(^|/)index\.html$','',p).replace('.html','')
            paths.add(p.rstrip('/') or '/')
old=re.findall(r'<loc>https://debesteaitools\.nl([^<]*)</loc>',open(W+'/public/oude-sitemap-2026-11-10.xml').read())
paths|={(p.rstrip('/') or '/') for p in old}
paths|={'/nieuws/bestaat-niet-xyz','/willekeurig/pad','/ai-tools/onbekende-tool','/digest','/vergelijk','/.well-known/ai-catalog.json'}
keep=['/robots.txt','/sitemap-index.xml','/sitemap-0.xml','/oude-sitemap-2026-11-10.xml','/favicon.ico','/favicon.svg','/apple-touch-icon.png']
UA={'User-Agent':'Mozilla/5.0 (compatible; redirect-check)'}
class NoR(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*a,**k): return None
op=urllib.request.build_opener(NoR)
def st(u):
    try: r=op.open(urllib.request.Request(u,headers=UA),timeout=30); return r.status,r.headers.get('Location') or ''
    except urllib.error.HTTPError as e: return e.code,e.headers.get('Location') or ''
    except Exception as e: return -1,str(e)[:60]
res={p:st(BASE+p) for p in []}
with ThreadPoolExecutor(12) as ex:
    out=list(ex.map(lambda p:(p,)+st(BASE+p),sorted(paths)))
    kout=list(ex.map(lambda p:(p,)+st(BASE+p),keep))
bad=[o for o in out if not(o[1]==301 and re.match(r'https://www\.(aiplatformmkb|hetlaatsteainieuws)\.nl/',o[2]))]
print('paden getest',len(out),'goed (301 extern)',len(out)-len(bad))
for b in bad[:15]: print('  FOUT',b)
print('bewaard:',[(p,c) for p,c,_ in kout])
tg=Counter(o[2].split('#')[0] for o in out if o[1]==301)
print('unieke doelen',len(tg))
with ThreadPoolExecutor(10) as ex: tres=list(ex.map(lambda u:(u,)+st(u),tg))
tb=[t for t in tres if t[1]!=200]
print('doelen niet direct 200',tb[:10])
json.dump({'out':out,'keep':kout,'targets':tres},open(S+'/localtest.json','w'))
print('top-doelen',tg.most_common(8))
sys.exit(1 if bad or tb else 0)
