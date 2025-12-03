import { styled } from "styled-components";
import { Button, Input } from "../../../../ui-components";

export const Form = styled(
  ({
    className,
    handleSubmit,
    name,
    setName,
    category,
    setCategory,
    categories,
    price,
    setPrice,
    quantity,
    setQuantity,
    image,
    setImage,
    description,
    setDescription,
    longDescription,
    setLongDescription,
    onClear,
    isEditing,
  }) => (
    <div className={className}>
      <form onSubmit={handleSubmit} className="form">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Image URL 625x525px"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Long description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(String(e.target.value))}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <Button type="submit">{isEditing ? "Save" : "Add Product"}</Button>
        <Button type="button" onClick={onClear}>
          Clear form
        </Button>
      </form>
    </div>
  )
)`
  padding: 45px;
  border-radius: 15px;
  box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 1),
    inset -1px -1px 5px rgba(255, 255, 255, 0.6);

  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
  }

  .select {
    padding: 10px;
    border-radius: 6px;
    font-size: 16px;
    color: #b0aeae;
    border-radius: 6px;
    border: 2px solid #212121;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    cursor: pointer;

    option {
      background-color: #212121;
      color: #b0aeae;
    }
  }
`;
