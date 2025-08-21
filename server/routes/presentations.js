import express from 'express';
import { validatePresentationData } from '../utils/validation.js';
import { generatePPTX } from '../utils/pptxGenerator.js';
import { generatePDF } from '../utils/pdfGenerator.js';

const router = express.Router();

// Validate presentation data
router.post('/validate', (req, res) => {
  try {
    const { presentationData } = req.body;
    
    if (!presentationData) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Missing presentationData in request body' 
      });
    }

    const validation = validatePresentationData(presentationData);
    
    res.json(validation);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ 
      valid: false, 
      error: 'Server error during validation' 
    });
  }
});

// Generate PowerPoint presentation
router.post('/generate-pptx', async (req, res) => {
  try {
    const { presentationData } = req.body;
    
    if (!presentationData) {
      return res.status(400).json({ 
        error: 'Missing presentationData in request body' 
      });
    }

    // Validate data first
    const validation = validatePresentationData(presentationData);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: 'Invalid presentation data',
        details: validation.errors
      });
    }
    
    console.log(`Generating PPTX for ${presentationData.length} slides...`);
    
    // Generate PowerPoint file
    const buffer = await generatePPTX(presentationData);
    
    // Set headers for file download
    const fileName = `presentation_${Date.now()}.pptx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', buffer.length);
    
    console.log(`✅ PPTX generated successfully: ${fileName} (${buffer.length} bytes)`);
    res.send(buffer);
    
  } catch (error) {
    console.error('Error generating PPTX:', error);
    res.status(500).json({ 
      error: 'Failed to generate PowerPoint presentation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Generate PDF presentation
router.post('/generate-pdf', async (req, res) => {
  try {
    const { presentationData } = req.body;
    
    if (!presentationData) {
      return res.status(400).json({ 
        error: 'Missing presentationData in request body' 
      });
    }

    // Validate data first
    const validation = validatePresentationData(presentationData);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: 'Invalid presentation data',
        details: validation.errors
      });
    }
    
    console.log(`Generating PDF for ${presentationData.length} slides...`);
    
    // Generate PDF file
    const buffer = await generatePDF(presentationData);
    
    // Set headers for file download
    const fileName = `presentation_${Date.now()}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', buffer.length);
    
    console.log(`✅ PDF generated successfully: ${fileName} (${buffer.length} bytes)`);
    res.send(buffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF presentation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get presentation info (for debugging/testing)
router.post('/info', (req, res) => {
  try {
    const { presentationData } = req.body;
    
    if (!presentationData || !Array.isArray(presentationData)) {
      return res.status(400).json({ 
        error: 'Invalid presentation data' 
      });
    }

    const info = {
      totalSlides: presentationData.length,
      templates: presentationData.map((slide, index) => ({
        slideNumber: index + 1,
        technique: slide.visuals?.metadata?.representationTechnique || 'Unknown',
        title: slide.title || 'Untitled',
        hasPageNumber: !!slide.pageNumber
      })),
      uniqueTemplates: [...new Set(presentationData.map(slide => 
        slide.visuals?.metadata?.representationTechnique
      ))],
      validation: validatePresentationData(presentationData)
    };

    res.json(info);
  } catch (error) {
    console.error('Error getting presentation info:', error);
    res.status(500).json({ 
      error: 'Failed to get presentation info' 
    });
  }
});

export default router;