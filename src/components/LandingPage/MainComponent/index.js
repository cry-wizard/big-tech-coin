import React from 'react'
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import happy from "../../../assets/happy.png";
import { motion } from 'framer-motion';

const Maincomponent = () => {
  return (
    <div className='flex-info'>
      <div className='left-component'>
        <motion.h1 className='track-crypto'
        initial={{opacity:0,y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.5}}
        >
        Track Crypto</motion.h1>
        <motion.h1 className='real-time-crypto'
        initial={{opacity:0,y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.5, delay:0.5}}
        >Real Time.</motion.h1>
        <motion.p className='info-text'
        initial={{opacity:0,y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.5, delay:0.9}}
        >
          Track crypto through a public api in real time. Visit the dashboard to do so!
        </motion.p>
        <motion.div className='btn-flex'
        initial={{opacity:0,x:50}}
        animate={{opacity:1, x:0}}
        transition={{duration:1.5, delay:0.5}}
        >
          <Button text={"Dashboard"}/>
          <Button text={"share"} outlined={true}/>
          <motion.img src={happy} className='happy' alt='Happy'
          initial={{rotateY:"0deg"}}
          animate={{rotateY:"360deg"}}
          transition={{
            type:"smooth",
            repeatType:"mirror",
            duration:3.5,
            repeat:Infinity,
          }}

          />
        </motion.div>

      </div>
      <div className='phone-container'>
        <motion.img src={iphone} className='iphone' alt="iPhone displaying the app"
          initial={{y:-20}}
          animate={{y:20}}
          transition={{
            type:"smooth",
            repeatType:"mirror",
            duration:2,
            repeat:Infinity,
          }}
        />
        <img src={gradient} className='gradient' alt="Gradient background"/>
      </div>
    </div>
  )
}

export default Maincomponent