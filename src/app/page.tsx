"use client";
import { AppleCardsCarouselDemo } from "@/components/applecards";
import { WavyBackgroundDemo } from "@/components/wavyback";
import { GlobeDemo } from "@/components/world";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  //frontend |
  return (
    <main className="">
      <GlobeDemo />
      <div>
        <WavyBackgroundDemo />
      </div>
      <AppleCardsCarouselDemo />
    </main>
  );
}
