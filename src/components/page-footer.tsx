export default function PageFooter() {
  return (
    <footer className="flex justify-between items-baseline flex-wrap p-2 md:w-full md:max-w-3xl md:mx-auto mt-auto">
      <p className="text-gray-500 text-sm">No copyright</p>
      <p>
        By{' '}
        <a
          href="https://omarhoumz.com/"
          className="text-blue-800 hover:text-blue-600"
        >
          Omar Houmz
        </a>
      </p>
    </footer>
  )
}
