
import './App.css'
import SlideRenderer from './SlideRenderer'

export default function App() {
  const demoSlides = [
    {
      visuals: {
        metadata: { representationTechnique: 'FourCardGrid' },
        content: {
          title: 'Modern Leadership Paradigms',
          pageNumber: 5,
          cards: [
            { id: 1, title: 'Servant Leadership', text: 'Focuses on the growth and well-being of people.' },
            { id: 2, title: 'Adaptive Leadership', text: 'Encourages flexibility and innovation.' },
            { id: 3, title: 'Transformational Leadership', text: 'Inspires positive change.' },
            { id: 4, title: 'Authentic Leadership', text: 'Grounded in self-awareness and ethics.' }
          ]
        }
      }
    },
    {
      visuals: {
        metadata: { representationTechnique: 'TitleTextAndImage' },
        content: {
          title: 'Basic Brain Anatomy Overview',
          text: 'The human brain is complex and fascinating... ',
          image: {
            src: 'https://images.unsplash.com/photo-1598805291185-941b83b3d115?q=80&w=800&auto=format&fit=crop',
            alt: 'Stylized 3D render of a human brain'
          },
          pageNumber: 3
        }
      }
    },
    {
      visuals: {
        metadata: { representationTechnique: 'HorizontalBarList' },
        content: {
          title: 'Neural Networks and Brain Communication',
          pageNumber: 4,
          networks: [
            { name: 'White Matter Tracts' },
            { name: 'Default Mode Network' },
            { name: 'Salience Network' },
            { name: 'Executive Control Network' }
          ]
        }
      }
    },
    {
      visuals: {
        metadata: { representationTechnique: 'VerticalBarChart' },
        content: {
          heading: 'Transformational vs Transactional Leadership',
          subheading: 'Comparison of key leadership behaviors (0–100 scale)',
          pageNumber: 1,
          chartData: [
            { label: 'Idealized Influence', value: 85 },
            { label: 'Inspirational Motivation', value: 90 },
            { label: 'Intellectual Stimulation', value: 80 },
            { label: 'Individualized Consideration', value: 88 },
            { label: 'Contingent Reward', value: 65 }
          ]
        }
      }
    }
  ];

  return (
    <div className="min-h-screen">
      {demoSlides.map((slide, idx) => (
        <SlideRenderer key={idx} slide={slide} />
      ))}
    </div>
  )
}
