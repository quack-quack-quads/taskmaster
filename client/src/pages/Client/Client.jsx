import { ClientProvider } from "../../context/clientContext"


const Client = () => {
  return (
    <ClientProvider>
      <div>Client</div>
    </ClientProvider>
  )
}

export default Client