/**
 * Runtime validation utilities
 * 
 * Provides validation functions for JSON data files using Zod schemas.
 * Validates data at build time to catch errors early.
 */

import { showcaseItemSchema, testimonialSchema } from '../types/content';
import type { ShowcaseItem, Testimonial, ValidationResult } from '../types/content';

// ============================================
// SHOWCASE VALIDATION
// ============================================

/**
 * Validate a single showcase item
 */
export function validateShowcaseItem(item: unknown, index: number): ValidationResult<ShowcaseItem> {
  const result = showcaseItemSchema.safeParse(item);
  
  if (!result.success) {
    console.error(`❌ Invalid showcase item at index ${index}:`);
    result.error.errors.forEach(err => {
      console.error(`   - ${err.path.join('.')}: ${err.message}`);
    });
    
    return {
      success: false,
      errors: result.error.errors.map(err => ({
        path: `showcase[${index}].${err.path.join('.')}`,
        message: err.message,
      })),
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}

/**
 * Validate showcase data array
 */
export function validateShowcaseData(data: unknown[]): ShowcaseItem[] {
  const validated: ShowcaseItem[] = [];
  const errors: Array<{ index: number; errors: any[] }> = [];
  
  data.forEach((item, index) => {
    const result = validateShowcaseItem(item, index);
    if (result.success && result.data) {
      validated.push(result.data);
    } else {
      errors.push({ index, errors: result.errors || [] });
    }
  });
  
  if (errors.length > 0) {
    throw new Error(
      `Showcase data validation failed for ${errors.length} item(s). Check console for details.`
    );
  }
  
  console.log(`✅ Validated ${validated.length} showcase items`);
  return validated;
}

// ============================================
// TESTIMONIAL VALIDATION
// ============================================

/**
 * Validate a single testimonial
 */
export function validateTestimonial(item: unknown, index: number): ValidationResult<Testimonial> {
  const result = testimonialSchema.safeParse(item);
  
  if (!result.success) {
    console.error(`❌ Invalid testimonial at index ${index}:`);
    result.error.errors.forEach(err => {
      console.error(`   - ${err.path.join('.')}: ${err.message}`);
    });
    
    return {
      success: false,
      errors: result.error.errors.map(err => ({
        path: `testimonials[${index}].${err.path.join('.')}`,
        message: err.message,
      })),
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}

/**
 * Validate testimonial data array
 */
export function validateTestimonialData(data: unknown[]): Testimonial[] {
  const validated: Testimonial[] = [];
  const errors: Array<{ index: number; errors: any[] }> = [];
  
  data.forEach((item, index) => {
    const result = validateTestimonial(item, index);
    if (result.success && result.data) {
      validated.push(result.data);
    } else {
      errors.push({ index, errors: result.errors || [] });
    }
  });
  
  if (errors.length > 0) {
    throw new Error(
      `Testimonial data validation failed for ${errors.length} item(s). Check console for details.`
    );
  }
  
  console.log(`✅ Validated ${validated.length} testimonials`);
  return validated;
}

// ============================================
// GENERIC VALIDATION HELPERS
// ============================================

/**
 * Check if value is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is a valid date
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Sanitize HTML string (basic XSS prevention)
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  return sanitizeHtml(input.trim().slice(0, maxLength));
}
