import { useEffect, useState } from 'react';
import chuck from '../images/chux.jpg';
import dad from '../images/dad.jpg';
import { Row, Col, Image } from 'react-bootstrap';

function Jokes({ facade }) {
  const [chuckJoke, setChuckJoke] = useState({ joke: '', ref: '' });
  const [dadJoke, setDadJoke] = useState({ joke: '', ref: '' });

  console.log(facade);

  const updateChuckJokes = (data) => {
    console.log('data', data);
    setChuckJoke({ joke: data.joke1, ref: data.joke1Reference });
    setDadJoke({ joke: data.joke2, ref: data.joke2Reference });
  };

  useEffect(() => {
    facade.fetchData('jokes', updateChuckJokes, null);
  }, [facade]);

  return (
    <>
      <Row className="mt-4">
        <Col>
          <h2>Chuck</h2>
          <Image src={chuck} fluid className="mb-4" />
          <h3>"{chuckJoke.joke}"</h3>
          <p>
            Reference: <a href={chuckJoke.ref}>{chuckJoke.ref}</a>
          </p>
        </Col>
        <Col>
          <h2>Dad</h2>
          <Image src={dad} fluid className="mb-4" />
          <h4>"{dadJoke.joke}"</h4>
          <p>
            Reference: <a href={dadJoke.ref}>{dadJoke.ref}</a>
          </p>
        </Col>
      </Row>
    </>
  );
}

export default Jokes;
