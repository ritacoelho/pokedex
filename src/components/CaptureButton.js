import React, {useState} from 'react';

import capturedPNG from '../images/captured.png';
import notCapturedPNG from '../images/not-captured.png';
import '../css/Misc.css';

const CaptureButton = ({big, captured, captureFn}) => {
    const [hover, setHover] = useState(false);

    return(
        <img 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={captureFn} className={big ? "big-pokeball" : "pokeball" }
            src={captured || hover == true? capturedPNG : notCapturedPNG}>
        </img>
    )
}

export default CaptureButton