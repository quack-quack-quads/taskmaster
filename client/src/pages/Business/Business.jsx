import { BusinessProvider } from "../../context/businessContext"

const Business = () => {
  return (
    <BusinessProvider>
      <div>Business</div>
    </BusinessProvider>
  )
}

export default Business