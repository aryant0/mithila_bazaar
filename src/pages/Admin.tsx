import { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, CreditCard, Eye, TrendingUp, LogOut } from 'lucide-react';
import * as XLSX from 'xlsx';
import { products as initialProducts, Product } from '@/data/products';
import { useProductContext } from '@/contexts/ProductContext';
import { Textarea } from '@/components/ui/textarea';

interface AdminProps {
  onLogout?: () => void;
}

// Visitor counter logic
function getTodayKey() {
  const today = new Date();
  return `visitors_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
}

function incrementVisitorCount() {
  const todayKey = getTodayKey();
  const visitedKey = 'visitedToday';
  const lastVisited = localStorage.getItem(visitedKey);
  const todayStr = todayKey;
  if (lastVisited !== todayStr) {
    // New visitor for today
    localStorage.setItem(visitedKey, todayStr);
    const count = parseInt(localStorage.getItem(todayKey) || '0', 10) + 1;
    localStorage.setItem(todayKey, count.toString());
  }
}

function getVisitorCount() {
  const todayKey = getTodayKey();
  return parseInt(localStorage.getItem(todayKey) || '0', 10);
}

const logoImage = '/LOGOS_page-0003.png'; // Use this as the product image

const Admin = ({ onLogout }: AdminProps) => {
  const [stats, setStats] = useState({
    visitorsToday: 0,
    tokensBooked: 0,
    messagesReceived: 0,
    totalRevenue: 0
  });
  const { productList, setProductList } = useProductContext();
  const [visitorsToday, setVisitorsToday] = useState(0);
  const [jsonInput, setJsonInput] = useState('');
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        visitorsToday: Math.floor(Math.random() * 150) + 50,
        tokensBooked: Math.floor(Math.random() * 25) + 5,
        messagesReceived: Math.floor(Math.random() * 15) + 3,
        totalRevenue: Math.floor(Math.random() * 500) + 100
      });
    }, 1000);

    // Update visitor count from localStorage
    setVisitorsToday(getVisitorCount());

    return () => clearTimeout(timer);
  }, []);

  // Handler for JSON input
  const handleJsonUpload = () => {
    try {
      const json = JSON.parse(jsonInput);
      if (Array.isArray(json)) {
        const newProducts = json.map((row, idx) => ({
          id: row.id || `json_${Date.now()}_${idx}`,
          name: row.name || '',
          category: row.category || 'Uncategorized',
          price: Number(row.price || row.mrp || 0),
          originalPrice: row.mrp ? Number(row.mrp) : undefined,
          image: logoImage,
          description: row.description || '',
          unit: row.unit || row['Weight/Quantity'] || '',
          inStock: row.inStock !== undefined ? row.inStock : true,
        }));
        setProductList(newProducts);
        setJsonInput('');
      }
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  // Handler for Excel upload
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExcelFile(file);
    setExcelData([]); // Reset previous data
  };

  const handleExtractExcelData = () => {
    if (!excelFile) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      setExcelData(json);
      // Only extract item name, selling price, and MRP
      const newProducts: Product[] = json.map((row, idx) => ({
        id: `excel_${Date.now()}_${idx}`,
        name: row['item name'] || row['Item Name'] || row['Product Name'] || row['Name'] || '',
        price: Number(row['selling'] || row['Selling'] || row['Selling Price'] || row['Price'] || 0),
        originalPrice: row['MRP'] ? Number(row['MRP']) : undefined,
        image: logoImage,
        description: '',
        unit: '',
        category: 'Uncategorized',
        inStock: true,
      })).filter(p => p.name && p.price);
      setProductList(newProducts);
    };
    reader.readAsBinaryString(excelFile);
  };

  const StatCard = ({ icon, title, value, color, trend }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex items-center space-x-1 text-green-600">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mithila Bazaar <span className="text-mithila-blue">Admin</span>
              </h1>
              <p className="text-gray-600 mt-2">Business Dashboard & Analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-mithila-blue to-blue-700 text-white px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">ERP Ready</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Eye className="text-white" size={24} />}
            title="Visitors Today"
            value={visitorsToday}
            color="bg-mithila-blue"
            trend=""
          />
        </div>

        {/* Excel/JSON Upload Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Product List (Excel or JSON)</h2>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            className="mb-4"
          />
          {excelFile && (
            <button
              onClick={handleExtractExcelData}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mb-4 ml-2"
            >
              QA: Extract Data
            </button>
          )}
          {excelData.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Raw Excel Data Preview (first 5 rows):</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs max-h-48 overflow-auto">
                {JSON.stringify(excelData.slice(0, 5), null, 2)}
              </pre>
            </div>
          )}
          <p className="text-gray-600 text-sm mb-2">Upload an Excel file with columns: ID, Product Name, MRP, Price, Weight/Quantity, Category, Description. Or paste JSON below.</p>
          <div className="mb-4">
            <Textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Paste JSON array of products here..."
              className="mb-2"
              rows={6}
            />
            <button
              onClick={handleJsonUpload}
              className="bg-mithila-blue text-white px-4 py-2 rounded hover:bg-mithila-blue/90 transition-colors"
            >
              Upload JSON
              </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Price</th>
                  <th className="px-2 py-1">MRP</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((p) => (
                  <tr key={p.id}>
                    <td className="px-2 py-1">{p.name}</td>
                    <td className="px-2 py-1">₹{p.price}</td>
                    <td className="px-2 py-1">{p.originalPrice ? `₹${p.originalPrice}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

export { incrementVisitorCount };
