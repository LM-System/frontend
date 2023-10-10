export default function Loading({dim}) {
  return (
    <>
      <span className={`block border-gray-100 rounded-full border-t-4 border-t-gray-600 border-4 w-${dim} h-${dim} animate-spin`}></span>
    </>
  );
}
