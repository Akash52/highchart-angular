# Angular 18 + Highcharts POC

A proof-of-concept project demonstrating Highcharts integration with Angular 18, featuring multiple interactive chart components including a draggable elements sequence builder.

## 🚀 Features

- **Angular 18.2.0** with standalone components
- **Highcharts 12.4.0** for data visualization
- **TypeScript** with strict mode
- **Multiple Chart Demos**:
  - Basic chart visualization
  - **Draggable Elements Sequence** - Interactive flat sequence builder with CRUD operations

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd high-chart-poc

# Install dependencies
npm install
```

## 🏃 Running the Application

```bash
# Start development server
npm start

# The app will be available at http://localhost:4200/
```

## 📚 Available Routes

- `/chart` - Basic Highcharts demo
- `/draggable-elements` - Interactive draggable elements sequence builder

## ✨ Draggable Elements Component

The draggable elements component showcases a powerful, interactive sequence builder with:

- **Drag & Drop Reordering**: Horizontally drag elements to change their order
- **CRUD Operations**: Create, Read, Update, and Delete elements via context menu
- **Visual Customization**: Each element has a custom color and displays its order number
- **Clean UI**: Minimal view with only elements and connecting lines
- **Real-time Updates**: Chart updates immediately after any operation

### Key Features:
- Flat sequence layout (non-hierarchical)
- Square markers for elements
- Connecting lines between elements
- Floating context menu with CRUD options
- Modal dialogs for element management
- Order numbers displayed on each element

For detailed documentation, see [DRAGGABLE_ELEMENTS_README.md](./DRAGGABLE_ELEMENTS_README.md)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── chart/                      # Basic chart component
│   ├── draggable-elements/         # Draggable elements component
│   │   ├── draggable-elements.component.ts
│   │   ├── draggable-elements.component.html
│   │   └── draggable-elements.component.css
│   ├── app.component.ts            # Root component
│   ├── app.config.ts               # App configuration
│   └── app.routes.ts               # Routing configuration
├── index.html
├── main.ts
└── styles.css
```

## 📦 Dependencies

### Core
- `@angular/core`: ^18.2.0
- `@angular/router`: ^18.2.0
- `highcharts`: ^12.4.0
- `highcharts-angular`: ^4.0.0

### Modules Used
- `highcharts/modules/draggable-points` - For drag & drop functionality

## 🔧 Build

```bash
# Build for production
npm run build

# Output will be in dist/ directory
```

## 🧪 Testing

```bash
# Run unit tests
npm test
```

## 📖 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Highcharts API Reference](https://api.highcharts.com/highcharts/)
- [Highcharts Angular Wrapper](https://github.com/highcharts/highcharts-angular)
- [Draggable Points Module](https://www.highcharts.com/docs/chart-concepts/draggable-points)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is a proof-of-concept and is available for educational purposes.

## 🐛 Known Issues

- None currently

## 🗺️ Roadmap

- [x] Basic Highcharts integration
- [x] Draggable elements sequence builder
- [ ] Drag-drop diagram builder
- [ ] Horizontal stack visualization
- [ ] More chart types and interactions

## 💡 Tips

### Customizing the Draggable Elements

1. **Change Colors**: Use the color picker in the edit dialog or enter hex values
2. **Adjust Chart Size**: Modify the `height` property in `initChart()` method  
3. **Styling**: Customize CSS in `draggable-elements.component.css`

### Performance Optimization

For large datasets (100+ elements), consider:
- Implementing virtual scrolling
- Using incremental updates instead of full chart reinitialization
- Debouncing drag operations

## 🙋 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include browser/OS information and steps to reproduce

---

Built with ❤️ using Angular 18 and Highcharts
