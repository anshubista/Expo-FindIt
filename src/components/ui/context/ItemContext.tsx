import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
type Item = {
  id: string;
  itemName: string;
  category: string;
  description: string;
  location: string;
  date: string;
  type: "Lost" | "Found";
  foundLocation?: string;
  foundNote?: string;
};

type FoundDetails = {
  foundLocation: string;
  foundNote: string;
};

type ItemContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  markAsFound: (id: string, details?: FoundDetails) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  // STEP 1: Load saved items when app starts
  useEffect(() => {
    loadItems();
  }, []);

  // STEP 2: Get items from AsyncStorage
  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("findit_items");

      if (savedItems !== null) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.log("Error loading items:", error);
    }
  };
  // step3 Add new item

  const addItem = async (item: Item) => {
    try {
      const updatedItems = [item, ...items];
      setItems(updatedItems);
      await AsyncStorage.setItem("findit_items", JSON.stringify(updatedItems));
    } catch (error) {
      console.log("Error saving item:", error);
    }
  };
// step 4 change lost item to found item
  const markAsFound =async (id: string)=>{    
    try {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, type: "Found" as const } : item,
      );
      setItems(updatedItems);
      await AsyncStorage.setItem("findit_items", JSON.stringify(updatedItems));
    }
    catch (error) {
      console.log("Error updating item:", error);
    }
  };
    

  return (
    <ItemContext.Provider value={{ items, addItem, markAsFound }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItems must be used inside ItemProvider");
  }

  return context;
}
