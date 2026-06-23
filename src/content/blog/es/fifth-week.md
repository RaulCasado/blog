---
title: "Semana 5: Inmersión Profunda en una Gran Refactorización"
description: "De componentes monolíticos a una arquitectura limpia. Esta semana ha sido un viaje de refactorización para atajar el prop drilling, centralizar la lógica y construir una base más sólida para el futuro."
pubDate: "2025-09-01"
tags: ["weekly","web_development"]
heroImage: '../../../assets/blog/weekly/refactor.jpg'
heroImageAlt: 'Un diagrama que muestra cómo un sistema complejo se simplifica mediante la refactorización'
---

Esta semana, decidí aparcar el desarrollo de nuevas funcionalidades para centrarme en un aspecto crucial y a menudo olvidado del desarrollo de software: la **refactorización**. A medida que el proyecto crecía, empecé a notar varios "code smells" (malos olores en el código) que hacían que la base del código fuera más difícil de mantener y escalar. Era hora de atacar de frente esta deuda técnica.

## 🚨 Identificando los Bad Smells

El primer paso fue analizar con lupa el estado actual de la aplicación e identificar las principales áreas problemáticas. Unos cuantos problemas cantaban a la legua:

### 1. El Componente Monolítico
El componente `ProjectDetail.tsx` se había convertido en un monstruo. Estaba manejando el estado de las tareas, ideas, bocetos y posts del blog, lo que llevaba a más de 20 imports y cientos de líneas de código. Un componente con tantas responsabilidades es una clara "red flag" y era, sin duda, la parte peor diseñada de la aplicación.

```typescript
// RED FLAG: Un componente con demasiados imports está haciendo demasiado.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// ... y más de 15 imports adicionales
```

### 2. Prop Drilling Excesivo
Para gestionar el estado, estaba pasando props a través de múltiples capas de componentes. Por ejemplo, una función `onDeleteTask` podía viajar desde `App.tsx` -> `ProjectDetail.tsx` -> `TasksSection.tsx` -> `TaskList.tsx` -> `TaskItem.tsx`. La mayoría de estos componentes intermedios ni siquiera usaban la función; solo la pasaban. Esto hace que los componentes estén fuertemente acoplados, sean difíciles de reutilizar y una pesadilla para depurar.

### 3. Dolores de Cabeza con el Estado y Desincronización
Más allá del prop drilling, encontré casos específicos donde la gestión del estado era frágil. Por ejemplo, en la funcionalidad del lienzo de dibujo, la lógica de `deshacer/rehacer` dependía de una variable de estado externa, lo que podía provocar errores de desincronización.

```typescript
// ANTES: Propenso a problemas de desincronización de estado
const saveToHistory = useCallback(() => {
  // ...
  setCanvasHistory(prev => {
    const newHistory = prev.slice(0, historyIndex + 1); // Depende del `historyIndex` externo
    newHistory.push(imageData);
    return newHistory;
  });
  setHistoryIndex(prev => prev + 1);
}, [historyIndex]); // Dependencia de un estado externo

// DESPUÉS: Actualización de estado robusta usando la forma funcional
const saveToHistory = useCallback(() => {
  // ...
  setCanvasHistory(prev => {
      const currentIndex = prev.length - 1;
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(imageData);
      return newHistory;
  });
  // Ya no hay dependencias externas para la lógica principal
}, []);
```
Este pequeño cambio es un ejemplo perfecto del principio: "Si estás actualizando un estado basándote en su valor anterior, usa siempre la forma funcional para evitar race conditions y dependencias fantasma."

### 4. Servicios Repartidos y Problemas de Integridad de Datos
Los servicios para el almacenamiento local, las notificaciones (`Swal`) y la manipulación de fechas estaban dispersos. Esta descentralización significaba que los componentes tenían dependencias directas de librerías específicas. Peor aún, provocaba problemas reales de integridad de datos. Por ejemplo, como las ideas se guardaban en una clave de localStorage diferente a la de los proyectos, al borrar un proyecto sus ideas asociadas quedaban huérfanas. Este es un síntoma clásico de una capa de datos desconectada.

## 🏗️ La Estrategia de Refactorización

Con los problemas identificados, tracé un plan multifase para mejorar sistemáticamente la arquitectura.

### Fase 1: Domando el Monolito con Context
El problema más urgente era `ProjectDetail`. La solución fue introducir la **API de Context de React**. Creé un `ProjectProvider` que encapsula todo el estado y la lógica relacionados con un único proyecto. Esto aplicó el **Principio de Inversión de Dependencias**: los componentes de alto nivel ya no dependen de los detalles de implementación de los de bajo nivel. En su lugar, ambos dependen de una abstracción (el contexto).

Este enfoque tiene dos enormes ventajas:
1.  **Elimina el Prop Drilling:** Cualquier componente hijo dentro del proveedor ahora puede acceder al estado y a las acciones compartidas directamente usando el hook `useContext`.
2.  **Desacopla Componentes:** `ProjectDetail` se convirtió en un simple componente "orquestador", responsable únicamente de organizar a sus hijos dentro del proveedor.

### Fase 2: Centralizando la Lógica con Hooks, Servicios y "Barrels"
Para combatir la lógica dispersa, tomé varias acciones clave:

1.  **Creé un hook `useSwal` y un servicio:** Estuve debatiendo si usar un patrón `context + hook` o `servicio + hook`. Como la necesidad principal era mostrar mensajes sin que los componentes necesitaran saber sobre una cola de notificaciones, el patrón más simple de `servicio + hook` era perfecto. Abstrae toda la lógica de notificaciones, así que si decido cambiar la librería más adelante, solo necesito actualizar el servicio.
2.  **Creé una clase `DateUtils`:** Toda la lógica de formato y manipulación de fechas está ahora en un solo lugar, garantizando la coherencia.
3.  **Implementé Barrel Exports:** Para limpiar los bloques masivos de imports, usé archivos `index.ts` para crear "barrels". Esto consolida las exportaciones de una carpeta de funcionalidades, permitiéndome convertir muchas líneas de import en una sola línea limpia.

### ¿Qué Sigue en la Hoja de Ruta de Refactorización?

El trabajo está lejos de terminar, pero se ha sentado una base sólida. Aquí están los siguientes pasos:

1.  **Hook Genérico `useForm`:** Crear un hook personalizado para manejar el estado, la validación y la lógica de envío de todos los formularios de la aplicación. Esto reducirá drásticamente el código repetitivo.
2.  **Servicio de Repositorio Unificado:** Consolidar todos los servicios de manejo de datos (`LocalStorageService`, `SketchStorageService`, etc.) en una única clase `Repository`. Esto proporcionará una API unificada para todas las operaciones de datos y, crucialmente, resolverá los problemas de integridad de datos como las ideas huérfanas.
3.  **Optimización del Rendimiento:** Usar estratégicamente `useMemo`, `useCallback` y `React.memo` para evitar re-renders innecesarios en componentes críticos, especialmente en vistas con muchos datos.
4.  **Librería de Componentes de UI:** Construir un conjunto de componentes de UI base y reutilizables (`Button`, `Input`, `Modal`) para asegurar una apariencia consistente y acelerar el desarrollo futuro.

Este proceso de refactorización ha sido una tarea enorme, pero las mejoras en la calidad del código, la mantenibilidad y la experiencia de desarrollo ya están dando sus frutos. Es un recordatorio de que construir un gran software no consiste solo en añadir funcionalidades, sino también en cuidar los cimientos sobre los que se construye.
