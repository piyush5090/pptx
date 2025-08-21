import React from 'react';
import FourCardGrid from "./PPT-Template-1-dark/FourCardGrid";
import TitledFeatureGrid from "./PPT-Template-1-dark/TitledFeatureGrid";
import TitleTextAndImage from "./PPT-Template-1-dark/TitleTextAndImage";
import TitledListWithFooter from "./PPT-Template-1-dark/TitledListWithFooter";
import TitledIconGrid from "./PPT-Template-1-dark/TitledIconGrid";
import HorizontalBarList from "./PPT-Template-1-dark/HorizontalBarList";
import ImageTextLayout from "./PPT-Template-1-dark/ImageTextLayout";
import Timeline from "./PPT-Template-1-dark/Timeline";
import VerticalBarChart from "./PPT-Template-1-dark/VerticalBarChart";

export const techniqueToComponent = {
  FourCardGrid,
  TitledFeatureGrid,
  TitleTextAndImage,
  TitledListWithFooter,
  TitledIconGrid,
  HorizontalBarList,
  ImageTextLayout,
  Timeline,
  VerticalBarChart
};

export default function SlideRenderer({ slide }) {
  const technique = slide?.visuals?.metadata?.representationTechnique;
  const Component = techniqueToComponent[technique];
  if (!Component) return null;
  return <Component slideData={slide.visuals?.content || slide} />;
}

