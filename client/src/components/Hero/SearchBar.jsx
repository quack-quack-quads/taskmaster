import { FaSearch } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <div className="sb">
      <InputGroup className="mb-3 mt-3 searchbar">
        <InputGroup.Text className="search-icon">
          <FaSearch className="search-icon-svg" />
        </InputGroup.Text>
        <Form.Control
          autofill="true"
          className="search-input"
          placeholder="Search for services"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
