import React from 'react'
import './loading.css'

export default function Loading() {
  return <>
<div class="loader__wrap" role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
	<div class="loader" aria-hidden="true">
		<div class="loader__sq"></div>
		<div class="loader__sq"></div>
	</div>
</div>
  </>
}
// <div class="book">
//     <div class="inner">
//         <div class="left"></div>
//         <div class="middle"></div>
//         <div class="right"></div>
//     </div>
//     <ul>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//     </ul>
// </div>
// <a class="dribbble" href="https://dribbble.com/shots/7199149-Book-Loader" target="_blank">
// <img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" />
// </a>