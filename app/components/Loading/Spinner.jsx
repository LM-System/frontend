export default function Loading({dim}) {
  return (
    <>
      <span className={`block border-gray-200 rounded-full border-t-4 border-t-[#3498DB] border-4 w-${dim} h-${dim} animate-spin`}></span>
    </>
  );
}
