/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ehp2c3GUskQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Skills() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore the Latest Technologies
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Stay ahead of the curve with our curated selection of the hottest programming languages and frameworks.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <EclipseIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Java</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Java is a powerful, object-oriented programming language used for building a wide range of applications,
                from enterprise software to mobile apps.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <ShellIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">C#</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                C# is a modern, object-oriented programming language developed by Microsoft. It is widely used for
                building Windows applications, games, and enterprise-level software.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <ComponentIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">React</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                React is a popular JavaScript library for building user interfaces. It's known for its component-based
                architecture and efficient rendering.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <AngryIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Angular</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Angular is a comprehensive, opinionated framework for building complex web applications. It provides a
                structured approach to development and includes features like two-way data binding and dependency
                injection.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <ViewIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Vue.js</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Vue.js is a progressive JavaScript framework for building user interfaces. It is known for its simplicity,
                flexibility, and performance.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <RadiationIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Rust</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Rust is a systems programming language that focuses on performance, safety, and concurrency. It is often
                used for building low-level software, such as operating systems, web browsers, and game engines.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <PyramidIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Python</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Python is a versatile, high-level programming language known for its simplicity and readability. It is
                widely used in a variety of domains, including data science, machine learning, web development, and
                automation.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <AppleIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Swift</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Swift is a modern, open-source programming language developed by Apple for building iOS, macOS, and other
                Apple platform applications. It is known for its safety, performance, and expressiveness.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <GoalIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Go</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Go, also known as Golang, is a statically typed, compiled programming language developed by Google. It is
                known for its simplicity, efficiency, and concurrency support, making it a popular choice for building
                scalable and high-performance systems.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <EclipseIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Kotlin</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Kotlin is a modern, open-source, statically typed programming language that is designed to be concise,
                safe, and interoperable with Java. It is widely used for building Android applications, as well as
                server-side and web development.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <TypeIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">TypeScript</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                TypeScript is a superset of JavaScript that adds optional static typing to the language. It is designed to
                help developers write more maintainable and scalable code, especially in large-scale applications.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <EclipseIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Elixir</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Elixir is a dynamic, functional programming language designed for building scalable and maintainable
                applications. It runs on the Erlang Virtual Machine (BEAM) and is known for its focus on concurrency,
                fault tolerance, and high availability.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <EclipseIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Scala</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  function AngryIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <path d="M7.5 8 10 9" />
        <path d="m14 9 2.5-1" />
        <path d="M9 10h0" />
        <path d="M15 10h0" />
      </svg>
    )
  }
  
  
  function AppleIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
      </svg>
    )
  }
  
  
  function ComponentIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
        <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
        <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
        <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
      </svg>
    )
  }
  
  
  function EclipseIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 1 0 10 10" />
      </svg>
    )
  }
  
  
  function GoalIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 13V2l8 4-8 4" />
        <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
        <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
      </svg>
    )
  }
  
  
  function PyramidIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" />
        <path d="M12 2v20" />
      </svg>
    )
  }
  
  
  function RadiationIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 12h0.01" />
        <path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z" />
        <path d="M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z" />
        <path d="M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z" />
      </svg>
    )
  }
  
  
  function ShellIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44" />
      </svg>
    )
  }
  
  
  function TypeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" x2="15" y1="20" y2="20" />
        <line x1="12" x2="12" y1="4" y2="20" />
      </svg>
    )
  }
  
  
  function ViewIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
        <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
      </svg>
    )
  }