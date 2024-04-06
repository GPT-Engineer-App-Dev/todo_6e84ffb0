import React, { useState } from "react";
import { Box, Heading, VStack, Input, IconButton, useToast, List, ListItem, ListIcon, HStack, Text, Button } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Can't add an empty todo",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Todo App</Heading>
      <HStack>
        <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} onKeyDown={handleEnterPress} />
        <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
      </HStack>
      <List spacing={3} w="100%">
        {todos.map((todo, index) => (
          <ListItem key={index} p={2} borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
            <Text>{todo}</Text>
            <Button size="sm" colorScheme="red" onClick={() => handleRemoveTodo(index)}>
              <ListIcon as={FaTrash} />
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
