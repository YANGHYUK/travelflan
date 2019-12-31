const path = require("path");
//html-webpack-plugin은 웹팩이 html파일을 읽어서 html파일을 빌드하게 해줌.
const HtmlWebPackPlugin = require("html-webpack-plugin");
//css를 추출해서 파일로 저장하는 플러그인 사용
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//clean-webpack-plugin 빌드시마다 안쓰는 애들을 지워주기 위해
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
    publicPath: "/"
  },
  devServer: {
    //webpack-dev-server 매번 수정할때마다 yarn build를 해주어야하는 번거로운 일을 해결하기 위해
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 3000,
    historyApiFallback: true
  },
  mode: "development", //production or development를 설정해줘야 용도에 맞게 사용가능
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader", // html파일을 읽을 때, html-loader가 실행되어 웹팩이 이해할 수 있게 해줌
            options: { minimize: true } //코드 최적화 옵션
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] //sass-loader로 scss파일을 읽고 css로 변환 후 css-loader로 css를 읽는다. 그후 minicssextractplugin으로 읽은 css을 추출
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", //public하위 index.html을 템플릿으로 읽는다.
      filename: "index.html" //아웃풋으로 출력할 파일
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CleanWebpackPlugin()
  ]
};
