import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import CategoryForm from "./CategoryForm";
import { useAuth0 } from "@auth0/auth0-react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const fetchCategories = async () => {
    try {
      const token = await getAccessTokenSilently();

      console.log("ID Token:", token);
      let response = await axios.get(
        "https://backend-productos.netlify.app/api/categorias",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Hubo un error al cargar las categorias");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleShowModal = () => {
    setSelectedCategory(null);
    setShowModal(true);
    fetchCategories();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchCategories();
  };

  const handleEditButtonClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteClick = (category) => {
    axios
      .delete(
        `https://backend-productos.netlify.app/api/categorias/${category.id}`
      )
      .then((response) => {
        console.log(response.data);
        toast.success("La categoria se ha eliminado correctamente.");
        fetchCategories();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Hubo un error al eliminar la categoria");
      });
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <BeatLoader />
      ) : (
        <>
          <Container>
            <Row>
              <Button onClick={handleShowModal}>Agregar Producto</Button>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>
                      <Button
                        className="me-2"
                        onClick={() => handleEditButtonClick(product)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          {showModal && (
            <CategoryForm
              showModal={showModal}
              handleClose={handleCloseModal}
              product={selectedCategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
