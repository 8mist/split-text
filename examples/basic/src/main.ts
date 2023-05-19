import './style.css';
import { gsap } from 'gsap';
import SplitText from '@gregoire.ciles/split-text';

const { chars } = new SplitText('#title');

gsap.fromTo(
  chars,
  {
    autoAlpha: 0,
    yPercent: 110,
  },
  {
    autoAlpha: 1,
    yPercent: 0,
    stagger: 0.02,
    duration: 1.9,
    ease: 'expo.inOut',
  },
);
