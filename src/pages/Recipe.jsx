import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();

  const fetchDetails = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await data.json();
      setDetails(detailData);
      console.log(detailData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map(({ id, original }) => (
              <li key={id}>{original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    width: 400px;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`;
const Info = styled.div`
  margin-left: 3rem;
`;

export default Recipe;
