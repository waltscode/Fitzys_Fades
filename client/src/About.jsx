/* eslint-disable react/no-unescaped-entities */
function About() {

  return (
    <>
      <main className="px-10 py-5">
        <h2 className="text-center text-4xl text-cyan-100 font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>About Us</h2>
        <div className="grid grid-cols-2 gap-4 items-center mt-5">
          <div className="flex justify-center relative">
            <div className="absolute" style={{ top: '-20rem' }}>
              <img src="images/owner_of_shop3.png" alt="Placeholder" className="mr-12 max-w scale-95 blur-edge"></img>
            </div>
          </div>

          <div>
            <p className="text-7xl text-cyan-600 text-center font-semibold pb-4 mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Fitzy's Fades</p>
            <p className="text-orange-200 mt-2 mr-12 max-w" style={{ textShadow: '4px 4px 3px rgba(0, 0, 0, 0.8)' }}>Welcome to Fitzy's Fades, where we blend artistry and precision to create exceptional hairstyles for our clients. At Fitzy's Fades, we take immense pride in our work, ensuring that every haircut is a masterpiece that reflects our dedication to excellence. Our team of skilled barbers is passionate about their craft, constantly honing their skills to stay updated with the latest trends and techniques in the industry.<br>
            </br>
              <br></br>
              <br></br>

              What sets us apart is our commitment to providing that extra touch of care and attention to detail. From the moment you step into our shop, you'll experience a welcoming atmosphere where client satisfaction is our top priority. Whether you're looking for a classic cut or a trendy fade, our barbers will work closely with you to understand your style preferences and deliver a tailored haircut that exceeds your expectations.<br>
              </br>
              <br></br>
              <br></br>

              At Fitzys Fades, we believe that a great haircut is not just about looking good but also feeling confident. That's why we strive to create a personalized experience for each client, ensuring they leave our shop feeling rejuvenated and ready to conquer the day with style. Visit us today and discover why Fitzys Fades is the go-to destination for exceptional haircuts with that extra touch of flair.</p>
          </div>
        </div>


      </main>
    </>
  )
}

export default About
