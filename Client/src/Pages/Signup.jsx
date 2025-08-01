import signupImg from "../Asset/Image/signup.webp"
import Template from "../Component/Core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyEase for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
