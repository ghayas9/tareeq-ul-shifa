// import Link from 'next/link';
// import {
//   CallIcon,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Message,
//   Twitter,
//   UpArrow,
// } from '../icons/Icons';

// const Footer = () => {
//   return (
//     <footer className="bg-primary py-4 w-full text-white">
//       <div className="pb-3 border-b">
//         <div className="flex justify-between w-11/12 mx-auto items-center">
//           <p className="font-robotoSlab sm:text-xl text-sm font-medium">
//             NEED HELP?
//           </p>
//           <div className="flex gap-4">
//             <div className="flex items-center gap-1">
//               <CallIcon />
//               <p className="md:text-sm text-xs ">123 456789</p>
//             </div>
//             <div className="flex items-center gap-1">
//               <Message />
//               <p className="md:text-sm text-xs">abc@gmail.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full mt-12 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex w-full mx-auto flex-col sm:flex-row justify-around items-start">
//           <div className="sm:w-1/3">
//             <h2 className="text-2xl font-bold">Tareeq-Ul-Shifa</h2>
//             <p className="text-sm mt-2">
//               Your trusted online pharmacy for quality medicines and healthcare
//               essentials
//             </p>
//           </div>
//           <div className="mt-2 md:mt-0 mb-6 sm:mb-0">
//             <h3 className="text-xl font-semibold mb-3">Help & Support</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="/track-order">Track Order</Link>
//               </li>
//               <li>
//                 <Link href="/exchange-return-policy">
//                   Exchange & Return Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/free-shipping">Free Shipping</Link>
//               </li>
//               <li>
//                 <Link href="/login-sign-up">Login/Sign Up</Link>
//               </li>
//             </ul>
//           </div>
//           <div className="mb-6 sm:mb-0">
//             <h3 className="text-xl font-semibold mb-3">Tareeq U1 Shifa</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="/about-us">About Us</Link>
//               </li>
//               <li>
//                 <Link href="/privacy-policy">Privacy Policy</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-6">
//           <div className="">
//             <span className="text-sm">Find Us On</span>
//             <div className="flex items-center  space-x-3 mt-2">
//               <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
//                 <Facebook />
//               </div>
//               <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
//                 <Twitter />
//               </div>
//               <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
//                 <Instagram />
//               </div>
//               <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
//                 <Linkedin />
//               </div>
//             </div>
//           </div>
//           <div
//             className="fixed bottom-12 right-6 text-sm flex justify-center items-center rounded text-white bg-secondary w-9 h-9 cursor-pointer shadow-lg"
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//           >
//             <UpArrow />
//           </div>
//         </div>
//       </div>
//       <div className="text-center text-sm mt-4 relative">
//         <span className="before:absolute before:left-0 before:top-1/2 before:w-1/3 before:border-t before:border-gray-300 after:absolute after:right-0 after:top-1/2 after:w-1/3 after:border-t after:border-gray-300 before:hidden after:hidden md:before:block md:after:block">
//           Copyright © 2025 Tareeq U1 Shifa Pharmacy. All rights reserved.
//         </span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from 'next/link';
import {
  CallIcon,
  Facebook,
  Instagram,
  Linkedin,
  Message,
  Twitter,
  UpArrow,
} from '../icons/Icons';

const Footer = () => {
  return (
    <footer className="bg-primary py-4 w-full text-white">
      <div className="pb-3 border-b">
        <div className="flex justify-between w-11/12 mx-auto items-center">
          <p className="font-robotoSlab sm:text-xl text-sm font-medium">
            NEED HELP?
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <CallIcon />
              <p className="md:text-sm text-xs ">123 456789</p>
            </div>
            <div className="flex items-center gap-1">
              <Message />
              <p className="md:text-sm text-xs">abc@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full mx-auto flex-col sm:flex-row justify-around items-start">
          <div className="sm:w-1/3">
            <h2 className="text-2xl font-bold">Tareeq-Ul-Shifa</h2>
            <p className="text-sm mt-2">
              Your trusted online pharmacy for quality medicines and healthcare
              essentials
            </p>
          </div>
          <div className="mt-2 md:mt-0 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders">Order History</Link>
              </li>
              {/* <li>
                <Link href="/order-history">Order History</Link>
              </li> */}
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Tareeq U1 Shifa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/account-setting">Account Settings</Link>
              </li>
              <li>
                <Link href="/login">Login</Link> /{' '}
                <Link href="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="">
            <span className="text-sm">Find Us On</span>
            <div className="flex items-center  space-x-3 mt-2">
              <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
                <Facebook />
              </div>
              <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
                <Twitter />
              </div>
              <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
                <Instagram />
              </div>
              <div className="bg-white flex items-center justify-center w-8 h-8 rounded-[3px]">
                <Linkedin />
              </div>
            </div>
          </div>
          <div
            className="fixed bottom-12 right-6 text-sm flex justify-center items-center rounded text-white bg-secondary w-9 h-9 cursor-pointer shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <UpArrow />
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-4 relative">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-1/3 before:border-t before:border-gray-300 after:absolute after:right-0 after:top-1/2 after:w-1/3 after:border-t after:border-gray-300 before:hidden after:hidden md:before:block md:after:block">
          Copyright © 2025 Tareeq U1 Shifa Pharmacy. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
