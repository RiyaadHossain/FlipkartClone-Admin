import CheckboxTree from "react-checkbox-tree";
import MyModal from "../../Components/UI/MyModal";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import InputField from "../../Components/UI/InputField";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addCategory, getAllCategory } from "../../Actions/categoryAction";
import {
  BiChevronUp,
  BiChevronDown,
  BiFolder,
  BiFolderOpen,
} from "react-icons/bi";
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from "react-icons/ri";

function Category() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [cateImg, setCateImg] = useState("");
  const [cateName, setCateName] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [subCateName, setSubCateName] = useState("");
  const [update, setUpdate] = useState(false);
  const categories = useSelector((state) => state.category.categories);

  /* Add Category to Database */
  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", cateName);
    form.append("parentId", subCateName);
    form.append("categoryImg", cateImg);
    dispatch(addCategory(form));
    setShow(false);
  };

  /* Print all the Category and Sub-category */
  const showCategory = (categories) => {
    let myCategory = [];
    for (const category of categories) {
      myCategory.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && showCategory(category.children),
      });
    }

    return myCategory;
  };

  /* Show Category in Select Options */
  const printCateSelect = (categories, options = []) => {
    for (const category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });

      if (category.children.length > 0) {
        printCateSelect(category.children, options);
      }
    }

    return options;
  };

  const updateCategory = () => {
    setUpdate(true);
    const categoryList = printCateSelect(categories)
    console.log({ expanded, checked, categoryList });
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Category</h1>
              <Button variant="primary" onClick={() => setShow(true)}>
                Add Category
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={showCategory(categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <RiCheckboxBlankFill />,
                uncheck: <RiCheckboxBlankLine />,
                halfCheck: <RiCheckboxBlankFill />,
                expandClose: <BiChevronDown />,
                expandOpen: <BiChevronUp />,
                parentClose: <BiFolder />,
                parentOpen: <BiFolderOpen />,
                leaf: <BiFolder />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <Button variant="danger" className="me-2">
              Delete
            </Button>
            <Button variant="success" onClick={updateCategory}>
              Edit
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Category - Add Modal */}
      <MyModal
        show={show}
        setShow={setShow}
        title="Add Category"
        buttonName="Add Category"
        handleSubmit={handleSubmit}
      >
        <InputField
          type="text"
          placeholder="Category Name"
          value={cateName}
          onChange={(e) => setCateName(e.target.value)}
        />
        <select
          className="form-control"
          value={subCateName}
          onChange={(e) => setSubCateName(e.target.value)}
        >
          <option>Select Category</option>
          {printCateSelect(categories).map((cate) => (
            <option key={cate.value} value={cate.value}>
              {cate.name}
            </option>
          ))}
        </select>
        <InputField
          type="file"
          onChange={(e) => setCateImg(e.target.files[0])}
        />{" "}
      </MyModal>

      {/* Category - Edit Modal */}
      <MyModal
        show={update}
        setShow={setUpdate}
        title="Update Category"
        buttonName="Edit"
        handleSubmit={handleSubmit}
        size="lg"
      >
        <Row className="mb-3">
          <Col>
            <h5>Expanded</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              type="text"
              placeholder="Category Name"
              value={cateName}
              noM={true}
              onChange={(e) => setCateName(e.target.value)}
            />
          </Col>
          <Col>
            <select className="form-control">
              <option>Select Category</option>
              <option>Select Category</option>
              <option>Select Category</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              type="file"
              onChange={(e) => setCateImg(e.target.files[0])}
            />
          </Col>
        </Row>
      </MyModal>
    </Layout>
  );
}

export default Category;
