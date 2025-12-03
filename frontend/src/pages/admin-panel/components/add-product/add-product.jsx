import styled from "styled-components";
import { useState, useEffect } from "react";
import { Form } from "../form/form";
import { Notification } from "../../../../ui-components";
import { request } from "../../../../utils";

const AddProductContainer = ({ className, product, onSave, onClear }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    request("/categories", "GET").then((res) => {
      if (res.data) {
        const formattedCategories = res.data.map((cat) => ({
          ...cat,
          id: String(cat._id || cat.id),
        }));
        setCategories(formattedCategories);
      }
    });
  }, []);

  useEffect(() => {
    if (product) {
      const categoryId = product.category_id
        ? String(product.category_id._id || product.category_id.id || product.category_id)
        : "";

      setCategory(categoryId);

      setName(product.name || "");

      setPrice(String(product.price || ""));
      setQuantity(String(product.stock_quantity || ""));

      setImage(product.image_url || "");
      setDescription(product.description || "");
      setLongDescription(product.long_description || "");
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImage("");
    setDescription("");
    setLongDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !category.trim() ||
      !String(price).trim() ||
      !String(quantity).trim() ||
      !description.trim() ||
      !longDescription.trim()
    ) {
      setIsEmpty(true);
      return;
    }

    const newProduct = {
      id: product?.id,
      name,
      description,
      long_description: longDescription,
      price: Number(price),
      image: image,
      category_id: category,
      stock_quantity: Number(quantity),
      created_at: new Date().toISOString(),
    };

    try {
      if (product) {
        const { id, ...updateData } = newProduct;
        await request(`/products/${product.id}`, "PATCH", updateData);
      } else {
        await request("/products", "POST", newProduct);
      }

      resetForm();
      onSave();
      setIsEmpty(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  useEffect(() => {
    if (isEmpty) {
      const timeout = setTimeout(() => setIsEmpty(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isEmpty]);

  const handlerClear = () => {
    resetForm();
    if (onClear) onClear();
  };

  return (
    <div className={className}>
      <h2 className="h2">{product ? "Edit Product" : "Add New Product"}</h2>
      {isEmpty && <Notification>Please fill all fields!</Notification>}
      <Form
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        categories={categories}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        image={image}
        setImage={setImage}
        description={description}
        setDescription={setDescription}
        longDescription={longDescription}
        setLongDescription={setLongDescription}
        onClear={handlerClear}
        isEditing={!!product}
      />
    </div>
  );
};

export const AddProduct = styled(AddProductContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .h2 {
    color: #3d3d3d;
  }
`;
