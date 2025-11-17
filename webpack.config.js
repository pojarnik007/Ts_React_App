const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Режим development включает полезные инструменты для отладки
  // В режиме production webpack будет оптимизировать и минимизировать код
  mode: 'development',

  // Точка входа для нашего приложения
  entry: './src/index.tsx',

  // Конфигурация devServer для быстрой разработки
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true, // Автоматически открывать браузер
    hot: true, // Горячая перезагрузка модулей
    historyApiFallback: true, // Для React Router
  },

  // Куда webpack будет складывать собранный код
  output: {
    filename: '[name].[contenthash].js', // Добавляем хэш для кэширования
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // Правила для обработки различных типов файлов
  module: {
    rules: [
      {
        // Все файлы .ts и .tsx обрабатываем через ts-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Файлы .css обрабатываем через style-loader и css-loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Для изображений и других ассетов
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Как webpack будет разрешать импорты
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Позволяет не писать расширения при импорте
  },

  // Плагины
  plugins: [
    // Очищает папку 'dist' перед каждой сборкой
    new CleanWebpackPlugin(),
    // Автоматически создает index.html в папке 'dist'
    // и подключает туда наш бандл
    new HtmlWebpackPlugin({
      template: './public/index.html', // Путь к нашему HTML-шаблону
    }),
  ],

  // Включаем source maps для удобной отладки
  devtool: 'inline-source-map',
};