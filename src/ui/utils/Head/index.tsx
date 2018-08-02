import * as React from 'react';
import { Head as HeadComp } from 'react-static';

interface Props {
  title?: string;
}

export function Head({ title }: Props) {
  return (
    <HeadComp>
      <link
        href="https://fonts.googleapis.com/css?family=Slabo+27px"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Abril+Fatface|Alegreya|Alegreya+Sans|Amatic+SC|Anton|Arvo|Bitter|Bree+Serif|Cabin|Cormorant+Garamond|Crimson+Text|Dosis|Indie+Flower|Josefin+Sans|Libre+Baskerville|Libre+Franklin|Lora|Merriweather|Noto+Serif|Nunito|Nunito+Sans|Playfair+Display:400,700,900|Quicksand|Shadows+Into+Light|Source+Serif+Pro|Titillium+Web|Work+Sans"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato"
        rel="stylesheet"
      />
      <title>Adam Pietrasiak</title>
    </HeadComp>
  );
}
