// Available presentation templates
const AVAILABLE_TEMPLATES = [
  'FourCardGrid',
  'TitledFeatureGrid',
  'TitleTextAndImage',
  'TitledListWithFooter',
  'TitledIconGrid',
  'HorizontalBarList',
  'ImageTextLayout',
  'Timeline',
  'VerticalBarChart'
];

/**
 * Validates the structure and content of presentation data
 * @param {Array} presentationData - Array of slide objects
 * @returns {Object} - Validation result with valid flag and errors array
 */
function validatePresentationData(presentationData) {
  const errors = [];
  
  // Check if data is an array
  if (!Array.isArray(presentationData)) {
    return {
      valid: false,
      errors: ['Presentation data must be an array of slide objects']
    };
  }
  
  // Check if array is not empty
  if (presentationData.length === 0) {
    return {
      valid: false,
      errors: ['Presentation data must contain at least one slide']
    };
  }

  // Check if array is not too large (reasonable limit)
  if (presentationData.length > 100) {
    errors.push('Presentation cannot have more than 100 slides');
  }

  // Validate each slide
  presentationData.forEach((slide, index) => {
    const slideNumber = index + 1;
    
    // Check basic structure
    if (!slide || typeof slide !== 'object') {
      errors.push(`Slide ${slideNumber}: Must be an object`);
      return;
    }

    // Check for required visuals.metadata.representationTechnique
    if (!slide.visuals?.metadata?.representationTechnique) {
      errors.push(`Slide ${slideNumber}: Missing required field 'visuals.metadata.representationTechnique'`);
    } else {
      const technique = slide.visuals.metadata.representationTechnique;
      if (!AVAILABLE_TEMPLATES.includes(technique)) {
        errors.push(`Slide ${slideNumber}: Unknown template '${technique}'. Available templates: ${AVAILABLE_TEMPLATES.join(', ')}`);
      } else {
        // Validate template-specific requirements
        const templateErrors = validateTemplateSpecificData(slide, technique, slideNumber);
        errors.push(...templateErrors);
      }
    }

    // Validate optional fields
    if (slide.pageNumber !== undefined && (typeof slide.pageNumber !== 'number' || slide.pageNumber < 1)) {
      errors.push(`Slide ${slideNumber}: pageNumber must be a positive number`);
    }

    if (slide.title !== undefined && (typeof slide.title !== 'string' || slide.title.trim() === '')) {
      errors.push(`Slide ${slideNumber}: title must be a non-empty string`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    slideCount: presentationData.length,
    templates: presentationData.map(slide => slide.visuals?.metadata?.representationTechnique).filter(Boolean)
  };
}

/**
 * Validates template-specific data requirements
 * @param {Object} slide - Slide data object
 * @param {string} technique - Template technique name
 * @param {number} slideNumber - Slide number for error reporting
 * @returns {Array} - Array of error messages
 */
function validateTemplateSpecificData(slide, technique, slideNumber) {
  const errors = [];

  switch (technique) {
    case 'FourCardGrid':
      if (!slide.cards || !Array.isArray(slide.cards)) {
        errors.push(`Slide ${slideNumber}: FourCardGrid requires 'cards' array`);
      } else {
        if (slide.cards.length === 0) {
          errors.push(`Slide ${slideNumber}: FourCardGrid requires at least one card`);
        }
        slide.cards.forEach((card, cardIndex) => {
          if (!card.title || typeof card.title !== 'string') {
            errors.push(`Slide ${slideNumber}, Card ${cardIndex + 1}: Missing or invalid 'title'`);
          }
          if (!card.text || typeof card.text !== 'string') {
            errors.push(`Slide ${slideNumber}, Card ${cardIndex + 1}: Missing or invalid 'text'`);
          }
        });
      }
      break;

    case 'Timeline':
      if (!slide.timelineItems || !Array.isArray(slide.timelineItems)) {
        errors.push(`Slide ${slideNumber}: Timeline requires 'timelineItems' array`);
      } else {
        if (slide.timelineItems.length === 0) {
          errors.push(`Slide ${slideNumber}: Timeline requires at least one timeline item`);
        }
        slide.timelineItems.forEach((item, itemIndex) => {
          if (!item.title || typeof item.title !== 'string') {
            errors.push(`Slide ${slideNumber}, Timeline Item ${itemIndex + 1}: Missing or invalid 'title'`);
          }
          if (!item.date || typeof item.date !== 'string') {
            errors.push(`Slide ${slideNumber}, Timeline Item ${itemIndex + 1}: Missing or invalid 'date'`);
          }
        });
      }
      break;

    case 'VerticalBarChart':
      if (!slide.chartData || !Array.isArray(slide.chartData)) {
        errors.push(`Slide ${slideNumber}: VerticalBarChart requires 'chartData' array`);
      } else {
        slide.chartData.forEach((item, itemIndex) => {
          if (!item.label || typeof item.label !== 'string') {
            errors.push(`Slide ${slideNumber}, Chart Item ${itemIndex + 1}: Missing or invalid 'label'`);
          }
          if (typeof item.value !== 'number') {
            errors.push(`Slide ${slideNumber}, Chart Item ${itemIndex + 1}: Missing or invalid 'value' (must be number)`);
          }
        });
      }
      break;

    case 'TitledFeatureGrid':
      if (!slide.features || !Array.isArray(slide.features)) {
        errors.push(`Slide ${slideNumber}: TitledFeatureGrid requires 'features' array`);
      } else {
        slide.features.forEach((feature, featureIndex) => {
          if (!feature.title || typeof feature.title !== 'string') {
            errors.push(`Slide ${slideNumber}, Feature ${featureIndex + 1}: Missing or invalid 'title'`);
          }
        });
      }
      break;

    case 'HorizontalBarList':
      if (!slide.items || !Array.isArray(slide.items)) {
        errors.push(`Slide ${slideNumber}: HorizontalBarList requires 'items' array`);
      } else {
        slide.items.forEach((item, itemIndex) => {
          if (!item.label || typeof item.label !== 'string') {
            errors.push(`Slide ${slideNumber}, Item ${itemIndex + 1}: Missing or invalid 'label'`);
          }
          if (typeof item.percentage !== 'number' || item.percentage < 0 || item.percentage > 100) {
            errors.push(`Slide ${slideNumber}, Item ${itemIndex + 1}: 'percentage' must be a number between 0 and 100`);
          }
        });
      }
      break;

    // Add more template validations as needed
    default:
      // For templates without specific validation, just check for title
      if (!slide.title) {
        errors.push(`Slide ${slideNumber}: Template '${technique}' requires a 'title' field`);
      }
      break;
  }

  return errors;
}

/**
 * Sanitizes presentation data by removing potentially harmful content
 * @param {Array} presentationData - Array of slide objects
 * @returns {Array} - Sanitized presentation data
 */
function sanitizePresentationData(presentationData) {
  return presentationData.map(slide => {
    const sanitized = { ...slide };
    
    // Remove any script tags or potentially dangerous HTML
    const sanitizeString = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    };

    // Recursively sanitize string values
    const sanitizeObject = (obj) => {
      if (typeof obj === 'string') {
        return sanitizeString(obj);
      } else if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      } else if (obj && typeof obj === 'object') {
        const sanitizedObj = {};
        for (const [key, value] of Object.entries(obj)) {
          sanitizedObj[key] = sanitizeObject(value);
        }
        return sanitizedObj;
      }
      return obj;
    };

    return sanitizeObject(sanitized);
  });
}

export {
  validatePresentationData,
  sanitizePresentationData,
  AVAILABLE_TEMPLATES
};