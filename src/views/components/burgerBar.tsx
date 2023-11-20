import React from "react";
import { BurgerClosedSVG, BurgerOpenedSVG } from "../assets/svg";

interface BurgerBarProps {}

export default function BurgerBar({}: BurgerBarProps) {
  return (
    <>
      <section className="relative w-max" id="burgerBar">
        <input type="checkbox" className="peer hidden" id="burgerBarBtn" />

        <label
          htmlFor="burgerBarBtn"
          className="flex cursor-pointer select-none text-3xl peer-checked:hidden"
        >
          <BurgerClosedSVG />
        </label>

        <label
          htmlFor="burgerBarBtn"
          className="hidden cursor-pointer select-none text-3xl peer-checked:block"
        >
          <BurgerOpenedSVG />
        </label>

        <article className="absolute left-0 top-full hidden peer-checked:block">
          <a href="#">GERBER</a>
        </article>
      </section>
    </>
  );
}
