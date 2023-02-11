import { useContext } from "react"
import { ClientContext } from "../../context/clientContext"
const tmp = () => {
    const { account, setAccount } = useContext(ClientContext);
    return (
        <div>tmp</div>
    )
}

export default tmp