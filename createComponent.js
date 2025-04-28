import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Создаем интерфейс для ввода с командной строки
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createReactComponent = (componentName) => {
  // Путь к папке компонента в уже существующей структуре src/Components
  const componentFolder = path.join(
    process.cwd(), // Используем process.cwd() вместо __dirname
    "src",
    "Components",
    componentName
  );

  // Проверка, существует ли папка компонента, если нет - создаем
  if (!fs.existsSync(componentFolder)) {
    fs.mkdirSync(componentFolder, { recursive: true });
    console.log(`Папка для компонента ${componentName} была успешно создана.`);
  } else {
    console.log(`Папка для компонента ${componentName} уже существует.`);
  }

  // Путь к файлу компонента
  const componentFile = path.join(componentFolder, `${componentName}.tsx`);

  // Путь к файлу SCSS
  const scssFile = path.join(componentFolder, `${componentName}.module.scss`);

  // Интерфейс для пропсов компонента
  const propsInterface = `
interface ${componentName}Props {
  handlerburgerClick: () => void;
  isOpen: boolean;
}
`;

  // Структура компонента (JSX)
  const componentContent = `
'use client';
import React from 'react';
import styles from './${componentName}.module.scss';
${propsInterface}

const ${componentName}: React.FC<${componentName}Props> = ({ handlerburgerClick, isOpen }) => {
  return (
    <div className="${componentName.toLowerCase()}">
      <div
        className={\`\${styles.burger} \${isOpen ? styles.run : ''}\`}
        onClick={() => handlerburgerClick()}
      >
        <div className="${componentName.toLowerCase()}-line"></div>
        <div className="${componentName.toLowerCase()}-line"></div>
        <div className="${componentName.toLowerCase()}-line"></div>
      </div>
    </div>
  );
};

export default ${componentName};
  `;

  // Структура SCSS
  const scssContent = `
@import '@/scss/common/colors';

.${componentName.toLowerCase()} {
  .burger {
    &.run {
      // Стили для активного состояния
    }
  }

  &-line {
    // Стили для линий бургера
  }
}
  `;

  // Запись содержимого в файл компонента (JSX)
  fs.writeFileSync(componentFile, componentContent.trim(), "utf8");
  console.log(
    `Компонент ${componentName} был успешно создан в ${componentFile}`
  );

  // Запись содержимого в файл SCSS
  fs.writeFileSync(scssFile, scssContent.trim(), "utf8");
  console.log(
    `Файл стилей ${componentName}.scss был успешно создан в ${scssFile}`
  );
};

// Запрашиваем имя компонента у пользователя
rl.question("Введите название нового компонента: ", (componentName) => {
  if (!componentName) {
    console.log("Имя компонента не может быть пустым.");
    rl.close();
    process.exit(1); // Завершаем процесс с ошибкой
  }

  // Создаем компонент с заданным именем
  createReactComponent(componentName);

  // Закрываем интерфейс readline и завершаем процесс
  rl.close();
  process.exit(0); // Завершаем процесс успешно
});
