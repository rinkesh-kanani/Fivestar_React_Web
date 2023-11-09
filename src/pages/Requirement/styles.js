import styled from 'styled-components';

const Diamond = styled.div`
  padding-top: 5px;
  text-align: center;
  border-bottom: 5px solid #000;
  margin-right: 5px;
  width: 80px;
  border-radius: 5px;
  cursor: pointer;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-top: 1px solid #000;
`;

const DiamondLabel = styled.span`
  color: #a4436e;
  font-size: 12px;
  margin: 0px;
  font-weight: bold;
  line-height: 1.8;
`;

const Shape = styled.div`
  margin: 0px 10px;
  padding: 5px;
  box-shadow: 0px 1px 1px #efd8d8;
  border-radius: 5px;
`;
const Slcer = styled.li`
  padding: 4px 0px 4px 0;
  text-align: center;
  border: 1px solid #51bbc9;
  width: 50px;
  border-radius: 4px;
  cursor: pointer;
  float: left;
  margin: 5px;
  font-size: 12px;
`;

const Shape3 = styled.li`
  padding: 4px 0px 4px 0;
  text-align: center;
  border: 1px solid #51bbc9;
  width: 100px;
  border-radius: 4px;
  cursor: pointer;
  float: left;
  margin: 5px;
  font-size: 12px;
`;

const Shape4 = styled.b`
  padding: 4px 0px 4px 0;
  text-align: center;
  border: 1px solid #51bbc9;
  width: 75px;
  border-radius: 4px;
  cursor: pointer;
  float: left;
  margin: 5px;
`;

export { Diamond, DiamondLabel, Shape, Slcer, Shape4, Shape3 };
