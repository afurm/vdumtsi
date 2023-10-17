import React, { useState, useEffect } from "react";
import { Image, ImageSourcePropType, ScrollView } from 'react-native';
import { List, Card, Text, Avatar, Layout, Divider, Modal, Button } from '@ui-kitten/components';

interface Product {
  name: string;
  description: string;
  price: {
    formatted: {
      price: string;
    };
  };
  media: {
    mainMedia: {
      thumbnail: {
        url: string;
      };
      image: {
        url: string;
      };
    };
  };
  id: string;
  slug: string;
  visible: boolean;
  productType: string;
  sku: string;
  weight: number;
  stock: {
    trackInventory: boolean;
    inStock: boolean;
    inventoryStatus: string;
  };
  ribbons: any[];
  customTextFields: any[];
  manageVariants: boolean;
  productOptions: any[];
  productPageUrl: {
    base: string;
    path: string;
  };
  numericId: string;
  inventoryItemId: string;
  discount: {
    type: string;
    value: number;
  };
  collectionIds: string[];
  variants: any[];
  lastUpdated: string;
  createdDate: string;
  ribbon: string;
  exportProductId: string;
}

const StoreScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const url = 'https://www.wixapis.com/stores/v1/products/query';
    const body = {
      includeVariants: true
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'MALQUqcVXtRLAGMIaaqDDIWRPyKXs6bHTII2TzNwj-s.eyJpbnN0YW5jZUlkIjoiMzJmNTk4OGEtNmIxNi00NTkyLWI0NDMtMTk0M2RjMmVhODJjIiwiYXBwRGVmSWQiOiIyMmJlZjM0NS0zYzViLTRjMTgtYjc4Mi03NGQ0MDg1MTEyZmYiLCJtZXRhU2l0ZUlkIjoiMzJmNTk4OGEtNmIxNi00NTkyLWI0NDMtMTk0M2RjMmVhODJjIiwic2lnbkRhdGUiOiIyMDIzLTA5LTIxVDEwOjMzOjA5LjY2N1oiLCJ1aWQiOiI5ZmUzODlhOS00NzJmLTQ3NTItOTExMy1lZGEyNjMyNGE4MjMiLCJwZXJtaXNzaW9ucyI6Ik9XTkVSIiwiZGVtb01vZGUiOmZhbHNlLCJzaXRlT3duZXJJZCI6IjlmZTM4OWE5LTQ3MmYtNDc1Mi05MTEzLWVkYTI2MzI0YTgyMyIsInNpdGVNZW1iZXJJZCI6IjlmZTM4OWE5LTQ3MmYtNDc1Mi05MTEzLWVkYTI2MzI0YTgyMyIsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0wOS0yMVQxNDozMzowOS42NjdaIiwibG9naW5BY2NvdW50SWQiOiI5ZmUzODlhOS00NzJmLTQ3NTItOTExMy1lZGEyNjMyNGE4MjMiLCJhb3IiOnRydWV9'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data.products);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const renderItemHeader = (headerProps: any, item: Product) => (
    <Layout {...headerProps}>
      <Text category="h6" style={{ marginBottom: 5 }}>{item.name}</Text>
      <Text category="s2">{item.price.formatted.price}</Text>
    </Layout>
  );

  const renderItemFooter = (footerProps: any, item: Product) => (
    <Button {...footerProps} appearance="ghost" onPress={() => openModal(item)}>See Details</Button>
  );

  const renderItem = ({ item }: { item: Product }) => (
    <Card
      style={{ marginVertical: 10 }}
      header={headerProps => renderItemHeader(headerProps, item)}
      footer={footerProps => renderItemFooter(footerProps, item)}
    >
      <ScrollView>
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.media.mainMedia && <Avatar style={{ marginRight: 15 }} size="giant" source={{ uri: item.media.mainMedia.thumbnail.url } as ImageSourcePropType} />}
          <Text category="p1" style={{ flex: 1 }}>{item.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        </Layout>
      </ScrollView>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <List
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={closeModal}
      >
        {selectedProduct && (
          <Card disabled>
            <Image
              source={{ uri: selectedProduct.media.mainMedia.image.url } as ImageSourcePropType}
              style={{ width: '100%', height: 200, resizeMode: 'cover' }}
            />
            <Text category="h5" style={{ marginVertical: 10 }}>{selectedProduct.name}</Text>
            <Text>{selectedProduct.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            <Button style={{ marginTop: 15 }} onPress={closeModal}>Close</Button>
          </Card>
        )}
      </Modal>
    </Layout>
  );
}

export default StoreScreen;
