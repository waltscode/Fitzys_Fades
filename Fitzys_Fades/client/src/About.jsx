function About() {
  //const [count, setCount] = useState(0)

  // const infoArr = useState[0] 
  // returns an array of two items: 
  // initial value, function to change the initial value infinite times

  // const count = infoArr[0]
  // const setCount = infoArr[1]

  // ES6 destructuring object/array
  // const [count, setCount] = useState(0)

  // const count = 0;
  // function setCount(newCount) {
  //   count = newCount;
  //   document.querySelector("#324534").textContent = newCount;
  // }

  return (
    <>
      <main>
        <h2 className="text-center text-4xl font-semibold">About Us</h2>
        <div className="flex items-center">
          <img src="https://via.placeholder.com/150" alt="Placeholder" className="mr-4"></img>

          <div>
            <p className="text-lg font-semibold">Lorem ipsum dolor sit amet</p>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
          </div>
        </div>

      </main>
    </>
  )
}

export default About
