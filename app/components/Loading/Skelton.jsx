import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Skelton({count}) {
  return(
    <Skeleton count={10} />
  )
}