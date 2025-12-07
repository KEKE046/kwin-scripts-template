// kwin.d.ts
// TypeScript declarations for KWin 6 scripting/effects API (simplified)

/**
 * Common helper types for geometry, lists, etc.
 */
declare namespace KWin {
  interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface RectF extends Rect {}
  interface Point {
    x: number;
    y: number;
  }
  interface PointF extends Point {}
  interface Size {
    width: number;
    height: number;
  }
  interface SizeF extends Size {}

  type QVariant = any;
  type QIcon = any;
  type QUuid = string;
  type WId = number;

  /**
   * Simple representation of a Qt-like signal.
   * Real KWin exposes `signal.connect(callback)` / `signal.disconnect(callback)`.
   */
  interface Signal<TArgs extends any[] = any[]> {
    connect(slot: (...args: TArgs) => void): void;
    disconnect(slot: (...args: TArgs) => void): void;
  }

  // ---------- Enums from Workspace / core ----------

  const enum ClientAreaOption {
    PlacementArea,
    MovementArea,
    MaximizeArea,
    MaximizeFullArea,
    FullScreenArea,
    WorkArea,
    FullArea,
    ScreenArea,
  }

  const enum ElectricBorder {
    ElectricTop,
    ElectricTopRight,
    ElectricRight,
    ElectricBottomRight,
    ElectricBottom,
    ElectricBottomLeft,
    ElectricLeft,
    ElectricTopLeft,
    ELECTRIC_COUNT,
    ElectricNone,
  }

  // ---------- Core objects: Options / Workspace / Desktop / Output / Window / Tiling ----------

  interface Options {
    // Real structure is huge; leave it open:
    [key: string]: any;
  }

  interface VirtualDesktop {
    // Read-only
    readonly id: string;
    readonly x11DesktopNumber: number;

    // Read-write
    name: string;

    // Signals
    readonly nameChanged: Signal<[]>;
    readonly x11DesktopNumberChanged: Signal<[]>;
    readonly aboutToBeDestroyed: Signal<[]>;
  }

  namespace OutputEnums {
    const enum DpmsMode {
      On,
      Standby,
      Suspend,
      Off,
    }

    const enum Capability {
      Dpms,
      Overscan,
      Vrr,
      RgbRange,
      HighDynamicRange,
      WideColorGamut,
      AutoRotation,
      IccProfile,
      Tearing,
    }

    const enum SubPixel {
      Unknown,
      None,
      Horizontal_RGB,
      Horizontal_BGR,
      Vertical_RGB,
      Vertical_BGR,
    }

    const enum RgbRange {
      Automatic,
      Full,
      Limited,
    }

    const enum AutoRotationPolicy {
      Never,
      InTabletMode,
      Always,
    }
  }

  interface Output {
    // Read-only properties
    readonly geometry: Rect;
    readonly devicePixelRatio: number;
    readonly name: string;
    readonly manufacturer: string;
    readonly model: string;
    readonly serialNumber: string;

    // Signals (simplified)
    readonly geometryChanged: Signal<[]>;
    readonly enabledChanged: Signal<[]>;
    readonly scaleChanged: Signal<[]>;
    readonly aboutToTurnOff: Signal<[number]>; // ms
    readonly wakeUp: Signal<[]>;
    readonly aboutToChange: Signal<[any]>;
    readonly changed: Signal<[]>;
    readonly currentModeChanged: Signal<[]>;
    readonly modesChanged: Signal<[]>;
    readonly outputChange: Signal<[any]>;
    readonly transformChanged: Signal<[]>;
    readonly dpmsModeChanged: Signal<[]>;
    readonly capabilitiesChanged: Signal<[]>;
    readonly overscanChanged: Signal<[]>;
    readonly vrrPolicyChanged: Signal<[]>;
    readonly rgbRangeChanged: Signal<[]>;
    readonly wideColorGamutChanged: Signal<[]>;
    readonly sdrBrightnessChanged: Signal<[]>;
    readonly highDynamicRangeChanged: Signal<[]>;
    readonly autoRotationPolicyChanged: Signal<[]>;
    readonly iccProfileChanged: Signal<[]>;
    readonly iccProfilePathChanged: Signal<[]>;
    readonly brightnessMetadataChanged: Signal<[]>;
    readonly sdrGamutWidenessChanged: Signal<[]>;
    readonly colorDescriptionChanged: Signal<[]>;

    // Functions
    mapToGlobal(pos: PointF): PointF;
    mapFromGlobal(pos: PointF): PointF;
  }

  namespace WindowEnums {
    const enum SizeMode {
      SizeModeAny,
      SizeModeFixedW,
      SizeModeFixedH,
      SizeModeMax,
    }
    const enum SameApplicationCheck {
      RelaxedForActive,
      AllowCrossProcesses,
    }
  }

  interface Window {
    // --- Geometry & basic state (read-only) ---
    readonly bufferGeometry: RectF;
    readonly clientGeometry: RectF;
    readonly pos: PointF;
    readonly size: SizeF;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly output: Output;
    readonly rect: Rect;
    readonly resourceName: string;
    readonly resourceClass: string;
    readonly windowRole: string;

    // Window type booleans
    readonly desktopWindow: boolean;
    readonly dock: boolean;
    readonly toolbar: boolean;
    readonly menu: boolean;
    readonly normalWindow: boolean;
    readonly dialog: boolean;
    readonly splash: boolean;
    readonly utility: boolean;
    readonly dropdownMenu: boolean;
    readonly popupMenu: boolean;
    readonly tooltip: boolean;
    readonly notification: boolean;
    readonly criticalNotification: boolean;
    readonly appletPopup?: boolean;
    readonly onScreenDisplay: boolean;
    readonly comboBox: boolean;
    readonly dndIcon: boolean;

    readonly windowType: number;
    readonly managed: boolean;
    readonly deleted: boolean;
    readonly popupWindow: boolean;
    readonly outline: boolean;
    readonly internalId: string;
    readonly pid: number;
    readonly stackingOrder: number;

    readonly fullScreenable: boolean;
    readonly active: boolean;
    readonly closeable: boolean;
    readonly icon: QIcon;
    readonly shadeable: boolean;
    readonly minimizable: boolean;
    readonly iconGeometry: RectF;
    readonly specialWindow: boolean;
    readonly caption: string;
    readonly minSize: SizeF;
    readonly maxSize: SizeF;
    readonly wantsInput: boolean;
    readonly transient: boolean;
    readonly transientFor: Window | null;
    readonly modal: boolean;
    readonly move: boolean;
    readonly resize: boolean;
    readonly decorationHasAlpha: boolean;
    readonly providesContextHelp: boolean;
    readonly maximizable: boolean;
    readonly moveable: boolean;
    readonly moveableAcrossScreens: boolean;
    readonly resizeable: boolean;
    readonly desktopFileName: string;
    readonly hasApplicationMenu: boolean;
    readonly applicationMenuActive: boolean;
    readonly unresponsive: boolean;
    readonly colorScheme: string;
    readonly layer: any; // Layer enum, simplify as any
    readonly hidden: boolean;
    readonly inputMethod: boolean;

    // --- Read-write properties ---
    opacity: number;
    skipsCloseAnimation: boolean;
    fullScreen: boolean;
    desktops: VirtualDesktop[];
    onAllDesktops: boolean;
    activities: string[];
    skipTaskbar: boolean;
    skipPager: boolean;
    skipSwitcher: boolean;
    keepAbove: boolean;
    keepBelow: boolean;
    shade: boolean;
    minimized: boolean;
    demandsAttention: boolean;
    frameGeometry: RectF;
    noBorder: boolean;
    tile: Tile | null;

    // --- Signals (subset, most used) ---
    readonly stackingOrderChanged: Signal<[]>;
    readonly shadeChanged: Signal<[]>;
    readonly opacityChanged: Signal<[Window, number]>;
    readonly damaged: Signal<[Window]>;
    readonly closed: Signal<[]>;
    readonly windowShown: Signal<[Window]>;
    readonly windowHidden: Signal<[Window]>;
    readonly outputChanged: Signal<[]>;
    readonly skipCloseAnimationChanged: Signal<[]>;
    readonly windowRoleChanged: Signal<[]>;
    readonly windowClassChanged: Signal<[]>;
    readonly bufferGeometryChanged: Signal<[RectF]>;
    readonly frameGeometryChanged: Signal<[RectF]>;
    readonly clientGeometryChanged: Signal<[RectF]>;
    readonly visibleGeometryChanged: Signal<[]>;
    readonly tileChanged: Signal<[Tile | null]>;
    readonly fullScreenChanged: Signal<[]>;
    readonly skipTaskbarChanged: Signal<[]>;
    readonly skipPagerChanged: Signal<[]>;
    readonly skipSwitcherChanged: Signal<[]>;
    readonly iconChanged: Signal<[]>;
    readonly activeChanged: Signal<[]>;
    readonly keepAboveChanged: Signal<[boolean]>;
    readonly keepBelowChanged: Signal<[boolean]>;
    readonly demandsAttentionChanged: Signal<[]>;
    readonly desktopsChanged: Signal<[]>;
    readonly activitiesChanged: Signal<[]>;
    readonly minimizedChanged: Signal<[]>;
    readonly colorSchemeChanged: Signal<[]>;
    readonly captionChanged: Signal<[]>;
    readonly transientChanged: Signal<[]>;
    readonly modalChanged: Signal<[]>;
    readonly hiddenChanged: Signal<[]>;

    // --- Functions (subset) ---
    closeWindow(): void;
    setMaximize(vertically: boolean, horizontally: boolean): void;
  }

  const enum TileLayoutDirection {
    Floating,
    Horizontal,
    Vertical,
  }

  interface TileManager {
    readonly rootTile: Tile;
    readonly model: any;
    readonly tileRemoved: Signal<[Tile]>;

    bestTileForPosition(x: number, y: number): Tile | null;
  }

  interface Tile {
    // Read-only
    readonly absoluteGeometry: RectF;
    readonly absoluteGeometryInScreen: RectF;
    readonly positionInLayout: number;
    readonly parent: Tile | null;
    readonly tiles: Tile[];
    readonly windows: Window[];
    readonly isLayout: boolean;
    readonly canBeRemoved: boolean;

    // Read-write
    relativeGeometry: RectF;
    padding: number;

    // Signals
    readonly relativeGeometryChanged: Signal<[]>;
    readonly absoluteGeometryChanged: Signal<[]>;
    readonly windowGeometryChanged: Signal<[]>;
    readonly paddingChanged: Signal<[number]>;
    readonly rowChanged: Signal<[number]>;
    readonly isLayoutChanged: Signal<[boolean]>;
    readonly childTilesChanged: Signal<[]>;
    readonly windowAdded: Signal<[Window]>;
    readonly windowRemoved: Signal<[Window]>;
    readonly windowsChanged: Signal<[]>;

    // Functions
    resizeByPixels(delta: number, edge: number): void; // Qt::Edge as number
  }

  interface Workspace {
    // Read-only
    readonly desktops: VirtualDesktop[];
    readonly desktopGridSize: Size;
    readonly desktopGridWidth: number;
    readonly desktopGridHeight: number;
    readonly workspaceWidth: number;
    readonly workspaceHeight: number;
    readonly workspaceSize: Size;
    readonly activeScreen: Output;
    readonly screens: Output[];
    readonly activities: string[];
    readonly virtualScreenSize: Size;
    readonly virtualScreenGeometry: Rect;
    readonly stackingOrder: Window[];
    readonly cursorPos: Point;

    // Read-write
    currentDesktop: VirtualDesktop;
    activeWindow: Window | null;
    currentActivity: string;

    // Signals
    readonly windowAdded: Signal<[Window]>;
    readonly windowRemoved: Signal<[Window]>;
    readonly windowActivated: Signal<[Window | null]>;
    readonly desktopsChanged: Signal<[]>;
    readonly desktopLayoutChanged: Signal<[]>;
    readonly screensChanged: Signal<[]>;
    readonly currentActivityChanged: Signal<[string]>;
    readonly activitiesChanged: Signal<[string]>;
    readonly activityAdded: Signal<[string]>;
    readonly activityRemoved: Signal<[string]>;
    readonly virtualScreenSizeChanged: Signal<[]>;
    readonly virtualScreenGeometryChanged: Signal<[]>;
    readonly currentDesktopChanged: Signal<[VirtualDesktop | null]>;
    readonly cursorPosChanged: Signal<[]>;

    // Functions (subset)
    slotSwitchDesktopNext(): void;
    slotSwitchDesktopPrevious(): void;
    slotSwitchDesktopRight(): void;
    slotSwitchDesktopLeft(): void;
    slotSwitchDesktopUp(): void;
    slotSwitchDesktopDown(): void;

    slotSwitchToNextScreen(): void;
    slotSwitchToPrevScreen(): void;
    slotSwitchToRightScreen(): void;
    slotSwitchToLeftScreen(): void;
    slotSwitchToAboveScreen(): void;
    slotSwitchToBelowScreen(): void;

    slotWindowToNextScreen(): void;
    slotWindowToPrevScreen(): void;
    slotWindowToRightScreen(): void;
    slotWindowToLeftScreen(): void;
    slotWindowToAboveScreen(): void;
    slotWindowToBelowScreen(): void;

    slotToggleShowDesktop(): void;
    slotWindowMaximize(): void;
    slotWindowMaximizeVertical(): void;
    slotWindowMaximizeHorizontal(): void;
    slotWindowMinimize(): void;
    slotWindowShade(): void;
    slotWindowRaise(): void;
    slotWindowLower(): void;
    slotWindowRaiseOrLower(): void;
    slotWindowMoveLeft(): void;
    slotWindowMoveRight(): void;
    slotWindowMoveUp(): void;
    slotWindowMoveDown(): void;

    slotWindowQuickTileLeft(): void;
    slotWindowQuickTileRight(): void;
    slotWindowQuickTileTop(): void;
    slotWindowQuickTileBottom(): void;

    sendClientToScreen(client: Window, output: Output): void;
    showOutline(geometry: Rect): void;
    showOutline(x: number, y: number, width: number, height: number): void;
    hideOutline(): void;

    screenAt(pos: PointF): Output | null;
    tilingForScreen(screenName: string): TileManager | null;
    tilingForScreen(output: Output): TileManager | null;

    clientArea(
      option: ClientAreaOption,
      output: Output,
      desktop: VirtualDesktop
    ): RectF;
    clientArea(option: ClientAreaOption, client: Window): RectF;

    createDesktop(position: number, name: string): void;
    removeDesktop(desktop: VirtualDesktop): void;

    supportInformation(): string;
    raiseWindow(window: Window): void;
    getClient(windowId: number): Window | null;
    windowAt(pos: PointF, count?: number): Window[];

    isEffectActive(pluginId: string): boolean;
  }

  // ---------- Effects / Scripted effects ----------

  namespace Effects {
    const enum OnScreenMessageHideFlag {
      SkipsCloseAnimation,
    }
  }

  interface EffectWindow {
    readonly geometry: RectF;
    readonly expandedGeometry: RectF;
    readonly height: number;
    readonly opacity: number;
    readonly pos: PointF;
    readonly screen: Output;
    readonly size: SizeF;
    readonly width: number;
    readonly x: number;
    readonly y: number;
    readonly desktops: VirtualDesktop[];
    readonly onAllDesktops: boolean;
    readonly onCurrentDesktop: boolean;
    readonly rect: Rect;
    readonly windowClass: string;
    readonly windowRole: string;

    readonly desktopWindow: boolean;
    readonly dock: boolean;
    readonly toolbar: boolean;
    readonly menu: boolean;
    readonly normalWindow: boolean;
    readonly dialog: boolean;
    readonly splash: boolean;
    readonly utility: boolean;
    readonly dropdownMenu: boolean;
    readonly popupMenu: boolean;
    readonly tooltip: boolean;
    readonly notification: boolean;
    readonly criticalNotification: boolean;
    readonly onScreenDisplay: boolean;
    readonly comboBox: boolean;
    readonly dndIcon: boolean;
    readonly windowType: number;
    readonly deleted: boolean;
    readonly caption: string;
    readonly keepAbove: boolean;
    readonly keepBelow: boolean;
    readonly modal: boolean;
    readonly moveable: boolean;
    readonly moveableAcrossScreens: boolean;
    readonly basicUnit: SizeF;
    readonly move: boolean;
    readonly resize: boolean;
    readonly iconGeometry: RectF;
    readonly specialWindow: boolean;
    readonly icon: QIcon;
    readonly skipSwitcher: boolean;
    readonly contentsRect: RectF;
    readonly decorationInnerRect: RectF;
    readonly hasDecoration: boolean;
    readonly activities: string[];
    readonly onCurrentActivity: boolean;
    readonly onAllActivities: boolean;
    readonly decorationHasAlpha: boolean;
    readonly visible: boolean;
    readonly skipsCloseAnimation: boolean;
    readonly fullScreen: boolean;
    readonly unresponsive: boolean;
    readonly waylandClient: boolean;
    readonly x11Client: boolean;
    readonly popupWindow: boolean;
    readonly internalWindow: any | null;
    readonly outline: boolean;
    readonly pid: number;
    readonly lockScreen: boolean;
    readonly hiddenByShowDesktop: boolean;

    // Read-write
    minimized: boolean;

    // Signals (subset)
    readonly minimizedChanged: Signal<[EffectWindow]>;
    readonly windowUnresponsiveChanged: Signal<[EffectWindow, boolean]>;

    // Functions (subset)
    addRepaint(rect: Rect): void;
    addRepaint(x: number, y: number, w: number, h: number): void;
    addRepaintFull(): void;
    addLayerRepaint(rect: Rect): void;
    addLayerRepaint(x: number, y: number, w: number, h: number): void;

    isOnActivity(id: string): boolean;
    isOnDesktop(desktop: VirtualDesktop): boolean;
    findModal(): EffectWindow | null;
    transientFor(): EffectWindow | null;
    mainWindows(): EffectWindow[];

    closeWindow(): void;
    setData(role: number, data: QVariant): void;
    data(role: number): QVariant;
  }

  namespace AnimationEffectEnums {
    const enum Anchor {
      Left,
      Top,
      Right,
      Bottom,
      Horizontal,
      Vertical,
      Mouse,
    }

    const enum Attribute {
      Opacity,
      Brightness,
      Saturation,
      Scale,
      Rotation,
      Position,
      Size,
      Translation,
      Clip,
      Generic,
      CrossFadePrevious,
      Shader,
      ShaderUniform,
      NonFloatBase,
    }

    const enum MetaType {
      SourceAnchor,
      TargetAnchor,
      RelativeSourceX,
      RelativeSourceY,
      RelativeTargetX,
      RelativeTargetY,
      Axis,
    }

    const enum Direction {
      Forward,
      Backward,
    }

    const enum TerminationFlag {
      DontTerminate,
      TerminateAtSource,
      TerminateAtTarget,
    }
    type TerminationFlags = TerminationFlag | number;
  }

  namespace ScriptedEffectEnums {
    const enum DataRole {
      WindowAddedGrabRole,
      WindowClosedGrabRole,
      WindowMinimizedGrabRole,
      WindowUnminimizedGrabRole,
      WindowForceBlurRole,
      WindowBlurBehindRole,
      WindowForceBackgroundContrastRole,
      WindowBackgroundContrastRole,
    }

    const enum EasingCurve {
      GaussianCurve,
    }

    const enum ShaderTrait {
      MapTexture,
      UniformColor,
      Modulate,
      AdjustSaturation,
    }
  }

  interface EffectsHandler {
    // Read-only
    readonly activeEffects: string[];
    readonly loadedEffects: string[];
    readonly listOfEffects: string[];
    readonly currentActivity: string;
    readonly desktopGridSize: Size;
    readonly desktopGridWidth: number;
    readonly desktopGridHeight: number;
    readonly workspaceWidth: number;
    readonly workspaceHeight: number;
    readonly desktops: VirtualDesktop[];
    readonly optionRollOverDesktops: boolean;
    readonly activeScreen: Output;
    readonly animationTimeFactor: number;
    readonly stackingOrder: EffectWindow[];
    readonly decorationsHaveAlpha: boolean;
    readonly compositingType: number;
    readonly cursorPos: PointF;
    readonly virtualScreenSize: Size;
    readonly virtualScreenGeometry: Rect;
    readonly hasActiveFullScreenEffect: boolean;
    readonly sessionState: number;
    readonly inputPanel: EffectWindow | null;

    // Read-write
    currentDesktop: VirtualDesktop;
    activeWindow: EffectWindow | null;

    // Signals (subset)
    readonly windowAdded: Signal<[EffectWindow]>;
    readonly windowClosed: Signal<[EffectWindow]>;
    readonly windowDeleted: Signal<[EffectWindow]>;
    readonly windowActivated: Signal<[EffectWindow | null]>;
    readonly stackingOrderChanged: Signal<[]>;
    readonly currentActivityChanged: Signal<[string]>;

    // Functions (subset)
    reconfigureEffect(name: string): void;
    loadEffect(name: string): boolean;
    toggleEffect(name: string): void;
    unloadEffect(name: string): void;
    isEffectLoaded(name: string): boolean;
    isEffectSupported(name: string): boolean;
    areEffectsSupported(names: string[]): boolean[];
    supportInformation(name: string): string;
    debug(name: string, parameter?: string): string;

    moveWindow(w: EffectWindow, pos: Point, snap?: boolean, snapAdjust?: number): void;
    windowToDesktops(w: EffectWindow, desktops: VirtualDesktop[]): void;
    windowToScreen(w: EffectWindow, screen: Output): void;

    desktopAbove(desktop?: VirtualDesktop | null, wrap?: boolean): VirtualDesktop | null;
    desktopToRight(desktop?: VirtualDesktop | null, wrap?: boolean): VirtualDesktop | null;
    desktopBelow(desktop?: VirtualDesktop | null, wrap?: boolean): VirtualDesktop | null;
    desktopToLeft(desktop?: VirtualDesktop | null, wrap?: boolean): VirtualDesktop | null;

    desktopName(desktop: VirtualDesktop): string;
    findWindow(id: WId | any | QUuid): EffectWindow | null;

    setElevatedWindow(w: EffectWindow, set: boolean): void;

    addRepaintFull(): void;
    addRepaint(r: Rect | number, y?: number, w?: number, h?: number): void;
  }

  interface ScriptedEffect {
    readonly pluginId: string;
    readonly isActiveFullScreenEffect: boolean;

    readonly configChanged: Signal<[]>;
    readonly animationEnded: Signal<[EffectWindow, number]>;
    readonly isActiveFullScreenEffectChanged: Signal<[]>;

    borderActivated(border: ElectricBorder): boolean;

    isGrabbed(w: EffectWindow, role: ScriptedEffectEnums.DataRole): boolean;
    grab(
      w: EffectWindow,
      role: ScriptedEffectEnums.DataRole,
      force?: boolean
    ): boolean;
    ungrab(w: EffectWindow, role: ScriptedEffectEnums.DataRole): boolean;

    readConfig(key: string, defaultValue?: any): any;

    displayWidth(): number;
    displayHeight(): number;
    animationTime(defaultTime: number): number;

    registerShortcut(
      objectName: string,
      text: string,
      keySequence: string,
      callback: (...args: any[]) => void
    ): void;

    registerScreenEdge(edge: number, callback: (...args: any[]) => void): boolean;
    registerRealtimeScreenEdge(edge: number, callback: (...args: any[]) => void): boolean;
    unregisterScreenEdge(edge: number): boolean;
    registerTouchScreenEdge(edge: number, callback: (...args: any[]) => void): boolean;
    unregisterTouchScreenEdge(edge: number): boolean;

    animate(
      window: EffectWindow,
      attribute: AnimationEffectEnums.Attribute,
      ms: number,
      to: any,
      from?: any,
      metaData?: number,
      curve?: number,
      delay?: number,
      fullScreen?: boolean,
      keepAlive?: boolean,
      shaderId?: number
    ): number;

    set(
      window: EffectWindow,
      attribute: AnimationEffectEnums.Attribute,
      ms: number,
      to: any,
      from?: any,
      metaData?: number,
      curve?: number,
      delay?: number,
      fullScreen?: boolean,
      keepAlive?: boolean,
      shaderId?: number
    ): number;

    retarget(
      animationId: number | number[],
      newTarget: any,
      newRemainingTime?: number
    ): boolean;

    freezeInTime(animationId: number | number[], frozenTime: number): boolean;

    redirect(
      animationId: number | number[],
      direction: AnimationEffectEnums.Direction,
      terminationFlags?: AnimationEffectEnums.TerminationFlags
    ): boolean;

    complete(animationId: number | number[]): boolean;
    cancel(animationId: number | number[]): boolean;

    touchEdgesForAction(action: string): number[];

    addFragmentShader(
      traits: ScriptedEffectEnums.ShaderTrait,
      fragmentShaderFile?: string
    ): number;

    setUniform(shaderId: number, name: string, value: any): void;
  }
}

// ---------- QEasingCurve namespace (for types only) ----------
declare namespace QEasingCurve {
  // KWin APIs mostly use QEasingCurve::Type; treat it as number enum.
  type Type = number;
}

// ---------- Global objects & functions (scripting) ----------

declare const options: KWin.Options;          // read-only
declare const workspace: KWin.Workspace;      // read-only
declare const effects: KWin.EffectsHandler;   // read-only (effects scripts)
declare const effect: KWin.ScriptedEffect;    // read-only (current scripted effect)
declare namespace KWin {}                     // value namespace for enums: KWin.ElectricBorder, etc.

/**
 * Global functions for scripts and effects.
 */
declare function print(...values: any[]): void;

declare function readConfig(key: string, defaultValue?: any): any;

declare function registerScreenEdge(
  border: KWin.ElectricBorder,
  callback: (...args: any[]) => void
): boolean;
declare function unregisterScreenEdge(border: KWin.ElectricBorder): boolean;

declare function registerShortcut(
  title: string,
  text: string,
  keySequence: string,
  callback: (...args: any[]) => void
): boolean;

declare function assert(value: boolean, message?: string): boolean;
declare function assertTrue(value: boolean, message?: string): boolean;
declare function assertFalse(value: boolean, message?: string): boolean;
declare function assertEquals(expected: any, actual: any, message?: string): boolean;
declare function assertNull(value: any, message?: string): boolean;
declare function assertNotNull(value: any, message?: string): boolean;

/**
 * D-Bus call: last argument may be callback.
 */
declare function callDBus(
  service: string,
  path: string,
  iface: string,
  method: string,
  ...args: any[]
): void;

// User actions menu types
interface KWinUserActionsMenuAction {
  title: string;
  checkable?: boolean;
  checked?: boolean;
  triggered?: (action: any) => void; // QAction
}
interface KWinUserActionsSubMenu {
  title: string;
  items: KWinUserActionsMenuAction[];
}
type KWinUserActionsMenuEntry =
  | KWinUserActionsMenuAction
  | KWinUserActionsSubMenu;

/**
 * Callback when user actions menu (Alt+F3 / decoration RMB) is about to be shown.
 *
 * Should return either a single entry or a submenu object, or nothing.
 */
declare function registerUserActionsMenu(
  callback: (window: KWin.Window) =>
    | KWinUserActionsMenuEntry
    | KWinUserActionsMenuEntry[]
    | void
): void;

// ---------- Global helpers available in effect scripts ----------

/**
 * Schedule one or more animations in effects scripting environment.
 * Use the methods on `effect` if you need full type safety.
 */
declare function animate(settings: any): number[]; // QList<quint64>
declare function set(settings: any): number[];     // QList<quint64>
declare function cancel(ids: number | number[]): boolean;

declare function animationTime(duration: number): number;
declare function displayWidth(): number;
declare function displayHeight(): number;

declare function addFragmentShader(
  traits: KWin.ScriptedEffectEnums.ShaderTrait,
  fragmentShaderFile: string
): number;
declare function setUniform(
  shaderId: number,
  name: string,
  value: any
): void;
