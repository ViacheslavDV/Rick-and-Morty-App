import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const BackToCharacters: React.FC = () => {
 return (
  <Link href="/character">
   <button className="w-[230px] h-[40px] rounded-md border-2 flex flex-row flex-nowrap justify-center py-[6px] mx-auto border-slate-700 text-center mt-12 hover:border-indigo-800 hover:shadow-xl hover:text-indigo-800">
    <IoIosArrowBack className="h-[22px] w-[22px] mr-8" />
    <p className="ml-3">Back To Characters</p>
   </button>
  </Link>
 );
};

export default BackToCharacters;
