import React, { createContext, useContext, useState } from "react";

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

  const addItem = (item: Item) => {
    setItems((previousItems) => [item, ...previousItems]);
  };

  const markAsFound = (id: string, details?: FoundDetails) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? { ...item, type: "Found" as const, ...details }
          : item
      )
    );
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