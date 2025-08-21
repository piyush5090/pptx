
import './App.css'
import FourCardGrid from "./PPT-Template-1-dark/FourCardGrid"
import TitledFeatureGrid from "./PPT-Template-1-dark/TitledFeatureGrid"
import TitleTextAndImage from "./PPT-Template-1-dark/TitleTextAndImage"
import TitledListWithFooter from "./PPT-Template-1-dark/TitledListWithFooter"
import TitledIconGrid from "./PPT-Template-1-dark/TitledIconGrid"
import HorizontalBarList from "./PPT-Template-1-dark/HorizontalBarList"
import ImageTextLayout from "./PPT-Template-1-dark/ImageTextLayout"
import Timeline from "./PPT-Template-1-dark/Timeline"
import VerticalBarChart from "./PPT-Template-1-dark/VerticalBarChart"

export default function App() {

  return (
    <div className="min-h-screen">
      <FourCardGrid/>
      <TitledFeatureGrid />
      <TitleTextAndImage />
      <TitledListWithFooter />
      <TitledIconGrid />
      <HorizontalBarList />
      <ImageTextLayout />
      <Timeline />
      <VerticalBarChart />

    </div>
  )
}
