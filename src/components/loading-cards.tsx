export function LoadingCards({ repeat }) {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <li
            className="flex items-center h-16 p-4 animate-pulse bg-gray-200 text-gray-700  text-3xl font-bold capitalize rounded shadow transition-shadow duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none"
            key={index}
          >
            <div className="h-8 w-32 bg-gray-600 bg-opacity-60"></div>
          </li>
        ))}
    </>
  )
}
