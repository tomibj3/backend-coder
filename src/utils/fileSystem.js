import fs from "fs";
import path from "path";

const productsFilePath = path.join(__dirname, '../data/products.json');
const cartsFilePath = path.join(__dirname, '../data/carts.json');

async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeJSON(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw error;
    }
}

async function getProducts() {
    return readJSON(productsFilePath);
}

async function saveProducts(products) {
    return writeJSON(productsFilePath, products);
}

async function getCarts() {
    return readJSON(cartsFilePath);
}

async function saveCarts(carts) {
    return writeJSON(cartsFilePath, carts);
}

module.exports = {
    getProducts,
    saveProducts,
    getCarts,
    saveCarts
};