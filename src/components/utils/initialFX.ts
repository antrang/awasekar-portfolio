import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export function initialFX() {
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new SplitText(".landing-h2-info", TextProps);

  gsap.set(".landing-info-h2", { opacity: 1, y: 0 });
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);
  var landingText6 = new SplitText(".landing-h2-3", TextProps);
  var landingText7 = new SplitText(".landing-h2-info-2", TextProps);

  LoopText(0.3, landingText2, landingText3, landingText7);
  LoopText(0.3, landingText4, landingText5, landingText6);
}

function LoopText(initialDelay: number, ...texts: SplitText[]) {
  const hold = 1.8;
  const dur = 1.2;
  const stagger = 0.08;

  texts.forEach((t) => gsap.set(t.chars, { y: 80, opacity: 0 }));

  const cycle = (exitIdx: number) => {
    const enterIdx = (exitIdx + 1) % texts.length;
    const tl = gsap.timeline();
    tl.to(texts[exitIdx].chars, { y: -80, duration: dur, ease: "power3.inOut", stagger }, 0);
    tl.fromTo(texts[enterIdx].chars, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: "power3.inOut", stagger }, 0);
    tl.call(() => gsap.delayedCall(hold, () => cycle(enterIdx)));
  };

  gsap.fromTo(
    texts[0].chars,
    { y: 80, opacity: 0 },
    {
      y: 0, opacity: 1, duration: dur, ease: "power3.inOut", stagger,
      delay: initialDelay,
      onComplete: () => gsap.delayedCall(hold, () => cycle(0)),
    }
  );
}
