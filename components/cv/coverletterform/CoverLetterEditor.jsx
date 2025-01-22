import PersonalInformation from "./PersonalInformation"
import LetterDetails from './LetterDetails'
import IntroductionAndBodyForm from "./IntroductionAndBodyForm"
import ClosingGratitudeAndSignatureForm from "./ClosingGratitudeAndSignatureForm"

const CoverLetterEditor =()=>{
  return (
    <>
    <PersonalInformation/>
    <LetterDetails/>
    <IntroductionAndBodyForm/>
    <ClosingGratitudeAndSignatureForm/>
    </>
  )
    
}
export default CoverLetterEditor