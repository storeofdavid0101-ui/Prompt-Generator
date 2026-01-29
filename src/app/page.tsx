"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, MapPin, User, Sparkles, Plus, X, Sun, Moon,
  Copy, Check, ChevronDown, Settings, Sliders, Image as ImageIcon,
  Lock, Unlock, RotateCcw, Zap, Layers, Eye, Save, Bookmark
} from 'lucide-react';

// Types
type AIModel = 'midjourney' | 'flux' | 'stable-diffusion' | 'dalle3';
type Atmosphere = 'cinematic' | 'golden-hour' | 'cyberpunk' | 'studio' | 'moody' | 'dreamy' | 'natural' | 'vintage';

interface ModelConfig {
  name: string;
  icon: string;
  maxCreativity: number;
  creativityParam: string;
  variationParam: string;
  negativeParam: string;
  aspectParam: string;
}

interface AtmosphereConfig {
  name: string;
  keywords: string;
  gradient: string;
  description: string;
}

interface PresetConfig {
  name: string;
  keywords: string;
  gradient: string;
}

export default function AdvancedPromptGenerator() {
  // Theme
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  // Model Selection
  const [selectedModel, setSelectedModel] = useState<AIModel>('midjourney');

  // Universal Sliders (1-100)
  const [creativity, setCreativity] = useState(50);
  const [variation, setVariation] = useState(50);
  const [uniqueness, setUniqueness] = useState(50);

  // Core Content
  const [subject, setSubject] = useState('');
  const [characterItems, setCharacterItems] = useState<Array<{id: string; content: string}>>([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [location, setLocation] = useState('');

  // Visual Presets
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<Atmosphere | null>(null);
  const [selectedVisualPreset, setSelectedVisualPreset] = useState<string | null>(null);

  // Camera Settings
  const [selectedCamera, setSelectedCamera] = useState('');
  const [customCamera, setCustomCamera] = useState('');
  const [selectedLens, setSelectedLens] = useState('50mm');
  const [customLens, setCustomLens] = useState('');
  const [selectedShot, setSelectedShot] = useState('Medium Shot (MS)');
  const [customShot, setCustomShot] = useState('');
  const [depthOfField, setDepthOfField] = useState('normal');

  // Advanced
  const [negativePrompt, setNegativePrompt] = useState('');
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [creativeControlsEnabled, setCreativeControlsEnabled] = useState(true);

  // Hover Preview removed for performance

  // UI State
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    model: true,
    sliders: true,
    atmosphere: true,
    visual: false,
    camera: false,
  });

  // User Presets (placeholder)
  const [savedPresets] = useState<Array<{id: string; name: string}>>([]);

  // Model Configurations
  const modelConfigs: Record<AIModel, ModelConfig> = {
    'midjourney': {
      name: 'Midjourney',
      icon: '🎨',
      maxCreativity: 1000,
      creativityParam: '--stylize',
      variationParam: '--chaos',
      negativeParam: '--no',
      aspectParam: '--ar',
    },
    'flux': {
      name: 'Flux',
      icon: '⚡',
      maxCreativity: 20,
      creativityParam: 'guidance_scale:',
      variationParam: 'variation:',
      negativeParam: 'negative:',
      aspectParam: 'aspect:',
    },
    'stable-diffusion': {
      name: 'Stable Diffusion',
      icon: '🔮',
      maxCreativity: 30,
      creativityParam: 'CFG Scale:',
      variationParam: 'Variation:',
      negativeParam: 'Negative prompt:',
      aspectParam: 'Size:',
    },
    'dalle3': {
      name: 'DALL-E 3',
      icon: '🌟',
      maxCreativity: 100,
      creativityParam: 'style:',
      variationParam: 'quality:',
      negativeParam: 'avoid:',
      aspectParam: 'size:',
    },
  };

  // Atmosphere Configurations
  const atmosphereConfigs: Record<Atmosphere, AtmosphereConfig> = {
    'cinematic': {
      name: 'Cinematic',
      keywords: 'cinematic lighting, dramatic shadows, high contrast, film grain, anamorphic lens flare, movie scene',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      description: 'Hollywood-style dramatic lighting',
    },
    'golden-hour': {
      name: 'Golden Hour',
      keywords: 'golden hour lighting, warm sunlight, soft shadows, lens flare, sunset glow, magic hour',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e74c3c 50%, #9b59b6 100%)',
      description: 'Warm sunset/sunrise lighting',
    },
    'cyberpunk': {
      name: 'Cyberpunk',
      keywords: 'neon lights, cyberpunk aesthetic, rain-soaked streets, holographic displays, pink and blue neon, futuristic',
      gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
      description: 'Neon-lit futuristic vibes',
    },
    'studio': {
      name: 'Studio',
      keywords: 'studio lighting, professional photography, softbox lighting, clean background, commercial quality',
      gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #bdbdbd 100%)',
      description: 'Clean professional studio setup',
    },
    'moody': {
      name: 'Moody',
      keywords: 'moody atmosphere, low key lighting, deep shadows, mysterious, atmospheric fog, chiaroscuro',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 50%, #0d1117 100%)',
      description: 'Dark and atmospheric mood',
    },
    'dreamy': {
      name: 'Dreamy',
      keywords: 'dreamy atmosphere, soft focus, ethereal glow, pastel colors, bokeh, gaussian blur, fantasy',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
      description: 'Soft ethereal fantasy look',
    },
    'natural': {
      name: 'Natural',
      keywords: 'natural lighting, outdoor photography, ambient light, realistic, documentary style',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 50%, #d4fc79 100%)',
      description: 'Authentic natural lighting',
    },
    'vintage': {
      name: 'Vintage',
      keywords: 'vintage film look, retro aesthetic, film grain, faded colors, 70s photography, analog feel',
      gradient: 'linear-gradient(135deg, #d4a574 0%, #c9a86c 50%, #8b7355 100%)',
      description: 'Retro film aesthetic',
    },
  };

  // Visual Presets (Photography/Cinema focused)
  const visualPresets: Record<string, PresetConfig> = {
    'raw': {
      name: 'RAW/Natural',
      keywords: 'natural photograph, unedited, authentic, true to life colors',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    },
    'highcontrast': {
      name: 'High Contrast',
      keywords: 'high contrast photography, deep blacks, bright highlights, punchy colors',
      gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    },
    'desaturated': {
      name: 'Desaturated',
      keywords: 'desaturated colors, muted tones, subtle palette, understated',
      gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
    },
    'vivid': {
      name: 'Vivid',
      keywords: 'vivid colors, saturated, vibrant, color-graded, punchy',
      gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    },
    'filmlook': {
      name: 'Film Look',
      keywords: 'film color grade, lifted blacks, crushed highlights, cinematic color',
      gradient: 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)',
    },
    'bleachbypass': {
      name: 'Bleach Bypass',
      keywords: 'bleach bypass look, desaturated, high contrast, silver retention, gritty',
      gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    },
  };

  // Lens Options
  const lensOptions = [
    'Macro', 'Fish Eye', '14mm', '24mm', '35mm', '50mm', '85mm', '135mm', '200mm', '400mm', '600mm'
  ];

  // Shot Type Options with AI-friendly keywords
  const shotOptions = [
    { label: 'Extreme Wide Shot (XWS)', keywords: 'extreme wide shot, establishing shot, vast landscape, tiny subject' },
    { label: 'Wide Shot (WS)', keywords: 'wide shot, full environment visible, subject in context' },
    { label: 'Full Shot', keywords: 'full shot, entire body visible, head to toe framing' },
    { label: 'Medium Wide Shot', keywords: 'medium wide shot, cowboy shot, knees up framing' },
    { label: 'Medium Shot (MS)', keywords: 'medium shot, waist up framing, conversational distance' },
    { label: 'Medium Close-Up (MCU)', keywords: 'medium close-up, chest up framing, emotional connection' },
    { label: 'Close-Up (CU)', keywords: 'close-up shot, face filling frame, intimate portrait' },
    { label: 'Extreme Close-Up (ECU)', keywords: 'extreme close-up, macro detail, eyes or single feature' },
    { label: 'Low Angle', keywords: 'low angle shot, camera looking up, heroic perspective, powerful' },
    { label: 'High Angle', keywords: 'high angle shot, camera looking down, vulnerable perspective' },
    { label: 'Dutch Angle', keywords: 'dutch angle, tilted camera, canted frame, disorienting' },
    { label: "Bird's Eye View", keywords: "bird's eye view, top-down shot, overhead perspective, aerial view" },
    { label: 'POV', keywords: 'POV shot, point of view, first person perspective, subjective camera' },
    { label: 'Over the Shoulder (OTS)', keywords: 'over the shoulder shot, OTS, back of head visible, looking at subject, two-shot composition' },
    { label: 'Two Shot', keywords: 'two shot, two people in frame, side by side composition' },
    { label: 'Insert Shot', keywords: 'insert shot, detail shot, object close-up, cutaway' },
  ];

  // Camera Type Options with appropriate keywords
  const cameraOptions = [
    // Film Formats
    { label: '8mm Film', keywords: 'shot on 8mm film, grainy, vintage home movie, warm tones, light leaks' },
    { label: 'Super 8', keywords: 'shot on Super 8, film grain, nostalgic, 1970s aesthetic, warm colors' },
    { label: '16mm Film', keywords: 'shot on 16mm film, organic grain, indie film look, natural colors' },
    { label: 'Super 16', keywords: 'shot on Super 16mm, cinematic grain, documentary style' },
    { label: '35mm Film', keywords: 'shot on 35mm film, classic cinema look, rich colors, natural grain' },
    { label: '65mm Film', keywords: 'shot on 65mm film, epic scale, incredible detail, IMAX quality' },
    { label: '70mm IMAX', keywords: 'shot on 70mm IMAX, massive resolution, stunning clarity, epic cinematography' },
    // Vintage Video
    { label: 'VHS Camcorder', keywords: 'VHS aesthetic, analog video, scan lines, tracking artifacts, low-fi, 480i, vintage 1980s video' },
    { label: 'Betacam', keywords: 'Betacam footage, broadcast quality vintage, 1990s news aesthetic' },
    { label: 'Hi8', keywords: 'Hi8 video, home video aesthetic, 1990s camcorder, slightly soft' },
    { label: 'MiniDV', keywords: 'MiniDV footage, early digital video, 2000s indie film look' },
    { label: 'Handycam', keywords: 'Sony Handycam, consumer video, home movie aesthetic, slightly shaky' },
    // Classic Film Cameras
    { label: 'Bolex H16', keywords: 'shot on Bolex H16, 16mm film, experimental cinema, art film aesthetic' },
    { label: 'Arriflex 16SR', keywords: 'shot on Arriflex 16SR, documentary style, naturalistic' },
    { label: 'Arriflex 35', keywords: 'shot on Arriflex 35mm, classic Hollywood cinematography' },
    { label: 'Mitchell BNC', keywords: 'shot on Mitchell BNC, golden age Hollywood, classic cinema' },
    { label: 'Panavision Panaflex', keywords: 'shot on Panavision, anamorphic, cinematic, blockbuster quality' },
    // Modern Cinema
    { label: 'ARRI Alexa', keywords: 'shot on ARRI Alexa, digital cinema, rich colors, cinematic' },
    { label: 'ARRI Alexa Mini', keywords: 'shot on ARRI Alexa Mini, modern cinema, pristine quality' },
    { label: 'ARRI Alexa 65', keywords: 'shot on ARRI Alexa 65, large format digital, incredible detail' },
    { label: 'RED Komodo', keywords: 'shot on RED Komodo, 6K digital cinema, sharp, modern' },
    { label: 'RED V-Raptor', keywords: 'shot on RED V-Raptor, 8K cinema, ultra high resolution' },
    { label: 'Sony Venice', keywords: 'shot on Sony Venice, full frame cinema, beautiful color science' },
    { label: 'Sony FX9', keywords: 'shot on Sony FX9, documentary cinema, natural colors' },
    { label: 'Blackmagic URSA', keywords: 'shot on Blackmagic URSA, digital film, rich dynamic range' },
    { label: 'Canon C500', keywords: 'shot on Canon C500, cinema EOS, clean digital' },
    { label: 'Canon C70', keywords: 'shot on Canon C70, compact cinema camera, versatile' },
    { label: 'Panavision DXL2', keywords: 'shot on Panavision DXL2, large format digital, Hollywood quality' },
    { label: 'IMAX Camera', keywords: 'shot on IMAX camera, massive resolution, immersive, theatrical' },
    // Photography Cameras
    { label: 'Hasselblad 500C', keywords: 'shot on Hasselblad 500C, medium format film, square format, classic' },
    { label: 'Hasselblad X2D', keywords: 'shot on Hasselblad X2D, 100 megapixel, incredible detail' },
    { label: 'Leica M6', keywords: 'shot on Leica M6, 35mm rangefinder, street photography aesthetic' },
    { label: 'Leica M11', keywords: 'shot on Leica M11, full frame digital, Leica color science' },
    { label: 'Mamiya RZ67', keywords: 'shot on Mamiya RZ67, medium format, portrait photography, creamy bokeh' },
    { label: 'Phase One XF', keywords: 'shot on Phase One, medium format digital, studio quality' },
    { label: 'Rolleiflex', keywords: 'shot on Rolleiflex TLR, vintage medium format, classic portrait look' },
    { label: 'Polaroid SX-70', keywords: 'Polaroid instant photo, vintage instant film, soft colors, white border' },
    { label: 'Contax T2', keywords: 'shot on Contax T2, 35mm compact, Zeiss lens, 1990s aesthetic' },
    // DSLRs & Mirrorless
    { label: 'Canon 5D Mark IV', keywords: 'shot on Canon 5D, full frame DSLR, professional photography' },
    { label: 'Canon R5', keywords: 'shot on Canon R5, mirrorless, high resolution, modern' },
    { label: 'Nikon D850', keywords: 'shot on Nikon D850, high resolution DSLR, sharp detail' },
    { label: 'Nikon Z9', keywords: 'shot on Nikon Z9, flagship mirrorless, professional' },
    { label: 'Sony A7S III', keywords: 'shot on Sony A7S III, low light specialist, video hybrid' },
    { label: 'Sony A1', keywords: 'shot on Sony A1, 50 megapixel, flagship mirrorless' },
    // Specialty
    { label: 'GoPro', keywords: 'GoPro footage, wide angle, action camera, immersive POV' },
    { label: 'DJI Drone', keywords: 'drone footage, aerial photography, birds eye view' },
    { label: 'iPhone Pro', keywords: 'shot on iPhone, smartphone photography, computational photography' },
    { label: 'Disposable Camera', keywords: 'disposable camera aesthetic, flash photography, party vibes, grainy' },
    { label: 'Pinhole Camera', keywords: 'pinhole camera, lo-fi, soft focus, dreamy, long exposure' },
    { label: 'Daguerreotype', keywords: 'daguerreotype, 1840s photography, silver plate, antique portrait' },
    { label: 'Wet Plate', keywords: 'wet plate collodion, tintype aesthetic, Victorian era, antique' },
    { label: 'Tintype', keywords: 'tintype photograph, Civil War era aesthetic, aged metal plate' },
  ];

  // Depth of Field Options
  const dofOptions = [
    { value: 'shallow', label: 'Shallow (Bokeh)', keywords: 'shallow depth of field, beautiful bokeh, blurred background, f/1.4' },
    { value: 'normal', label: 'Normal', keywords: '' },
    { value: 'deep', label: 'Deep (All in Focus)', keywords: 'deep depth of field, everything in focus, f/11, sharp throughout' },
    { value: 'tilt-shift', label: 'Tilt-Shift', keywords: 'tilt-shift photography, miniature effect, selective focus' },
  ];

  // Theme Colors
  const themeColors = useMemo(() => {
    if (darkMode) {
      return {
        background: '#0a0a0b',
        cardBackground: 'rgba(20, 20, 22, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        textPrimary: '#f8fafc',
        textSecondary: '#a1a1aa',
        textTertiary: '#71717a',
        inputBackground: 'rgba(39, 39, 42, 0.8)',
        inputBorder: 'rgba(63, 63, 70, 0.8)',
        accent: '#6366f1',
        accentHover: '#818cf8',
        promptBg: 'rgba(99, 102, 241, 0.08)',
        success: '#10b981',
        warning: '#f59e0b',
      };
    } else {
      return {
        background: '#FFFEF5',
        cardBackground: 'rgba(255, 253, 245, 0.95)',
        borderColor: 'rgba(139, 115, 85, 0.2)',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textTertiary: '#6a6a6a',
        inputBackground: 'rgba(255, 250, 240, 0.9)',
        inputBorder: 'rgba(139, 115, 85, 0.3)',
        accent: '#6366f1',
        accentHover: '#818cf8',
        promptBg: 'rgba(99, 102, 241, 0.08)',
        success: '#10b981',
        warning: '#f59e0b',
      };
    }
  }, [darkMode]);

  // Translate Universal Sliders to Model Parameters
  const translateSliders = useCallback(() => {
    const config = modelConfigs[selectedModel];

    switch (selectedModel) {
      case 'midjourney':
        return {
          creativity: `${config.creativityParam} ${Math.round(creativity * 10)}`,
          variation: `--chaos ${Math.round(variation)}`,
          quality: creativity > 70 ? '--q 2' : '',
        };
      case 'flux':
        return {
          creativity: `${config.creativityParam} ${(creativity / 5).toFixed(1)}`,
          variation: `${config.variationParam} ${variation}`,
          quality: '',
        };
      case 'stable-diffusion':
        return {
          creativity: `${config.creativityParam} ${(creativity / 100 * 30).toFixed(1)}`,
          variation: `${config.variationParam} ${variation}%`,
          quality: uniqueness > 50 ? 'Steps: 50' : 'Steps: 30',
        };
      case 'dalle3':
        return {
          creativity: creativity > 70 ? 'style: vivid' : 'style: natural',
          variation: uniqueness > 50 ? 'quality: hd' : 'quality: standard',
          quality: '',
        };
      default:
        return { creativity: '', variation: '', quality: '' };
    }
  }, [selectedModel, creativity, variation, uniqueness]);

  // Character Management
  const addCharacter = () => {
    if (currentCharacter.trim() && !settingsLocked) {
      setCharacterItems(prev => [...prev, {
        id: crypto.randomUUID().slice(0, 9),
        content: currentCharacter.trim()
      }]);
      setCurrentCharacter('');
    }
  };

  const removeCharacter = (id: string) => {
    if (!settingsLocked) {
      setCharacterItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Generate Final Prompt
  const generatePrompt = useCallback(() => {
    const parts: string[] = [];
    const config = modelConfigs[selectedModel];
    const params = translateSliders();

    // [Subject] - Always first
    if (subject.trim()) {
      parts.push(subject.trim());
    }

    // Characters (include both saved items and current input)
    const allCharacters = [
      ...characterItems.map(c => c.content),
      ...(currentCharacter.trim() ? [currentCharacter.trim()] : [])
    ];
    if (allCharacters.length > 0) {
      parts.push(allCharacters.join(', '));
    }

    // Location
    if (location.trim()) {
      parts.push(`in ${location.trim()}`);
    }

    // [Visual Presets]
    if (selectedVisualPreset && visualPresets[selectedVisualPreset]) {
      parts.push(visualPresets[selectedVisualPreset].keywords);
    }

    // [Atmosphere]
    if (selectedAtmosphere && atmosphereConfigs[selectedAtmosphere]) {
      parts.push(atmosphereConfigs[selectedAtmosphere].keywords);
    }

    // [Camera]
    const cameraConfig = cameraOptions.find(c => c.label === selectedCamera);
    const finalCamera = customCamera.trim() || (cameraConfig ? cameraConfig.keywords : '');
    const finalLens = customLens.trim() || selectedLens;
    const shotConfig = shotOptions.find(s => s.label === selectedShot);
    const finalShot = customShot.trim() || (shotConfig ? shotConfig.keywords : selectedShot);
    const dofConfig = dofOptions.find(d => d.value === depthOfField);

    if (finalCamera) {
      parts.push(finalCamera);
    }
    if (finalLens) {
      parts.push(`${finalLens} lens`);
    }
    if (finalShot) {
      parts.push(finalShot);
    }
    if (dofConfig && dofConfig.keywords) {
      parts.push(dofConfig.keywords);
    }

    // Build main prompt
    let prompt = parts.filter(Boolean).join(', ');

    // Add model-specific parameters (only if creative controls enabled)
    if (selectedModel === 'midjourney') {
      const mjParams = [];
      if (creativeControlsEnabled) {
        if (params.creativity) mjParams.push(params.creativity);
        if (params.variation) mjParams.push(params.variation);
        if (params.quality) mjParams.push(params.quality);
      }
      if (negativePrompt.trim()) {
        mjParams.push(`${config.negativeParam} ${negativePrompt.trim()}`);
      }
      if (mjParams.length > 0) {
        prompt += ' ' + mjParams.join(' ');
      }
    } else if (selectedModel === 'stable-diffusion') {
      if (negativePrompt.trim()) {
        prompt += `\n\n${config.negativeParam} ${negativePrompt.trim()}`;
      }
      if (creativeControlsEnabled) {
        prompt += `\n\n${params.creativity}, ${params.quality}`;
      }
    } else if (selectedModel === 'flux') {
      if (creativeControlsEnabled) {
        prompt += `\n\n[${params.creativity}, ${params.variation}]`;
      }
      if (negativePrompt.trim()) {
        prompt += `\n${config.negativeParam} ${negativePrompt.trim()}`;
      }
    } else if (selectedModel === 'dalle3') {
      // DALL-E 3 uses natural language, parameters are embedded
      if (negativePrompt.trim()) {
        prompt += `, avoiding ${negativePrompt.trim()}`;
      }
    }

    return prompt || 'Start by adding a subject...';
  }, [subject, characterItems, location, selectedVisualPreset, selectedAtmosphere,
      selectedCamera, customCamera, selectedLens, customLens, selectedShot, customShot,
      depthOfField, selectedModel, negativePrompt, creativeControlsEnabled, translateSliders]);

  // Copy to Clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset All
  const resetAll = () => {
    if (settingsLocked) return;
    setSubject('');
    setCharacterItems([]);
    setCurrentCharacter('');
    setLocation('');
    setSelectedAtmosphere(null);
    setSelectedVisualPreset(null);
    setSelectedCamera('');
    setCustomCamera('');
    setSelectedLens('50mm');
    setCustomLens('');
    setSelectedShot('Medium Shot (MS)');
    setCustomShot('');
    setDepthOfField('normal');
    setNegativePrompt('');
    setCreativity(50);
    setVariation(50);
    setUniqueness(50);
  };

  // Section Toggle
  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Section Header Component
  const SectionHeader = ({ title, icon: Icon, sectionKey, badge }: {
    title: string;
    icon: React.ElementType;
    sectionKey: string;
    badge?: string;
  }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between py-3 group"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: themeColors.accent }} />
        <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>{title}</span>
        {badge && (
          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{
            backgroundColor: themeColors.promptBg,
            color: themeColors.accent
          }}>
            {badge}
          </span>
        )}
      </div>
      <motion.div
        animate={{ rotate: expandedSections[sectionKey] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
      </motion.div>
    </button>
  );


  // Universal Slider Component
  const UniversalSlider = ({
    label,
    value,
    onChange,
    icon: Icon
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    icon: React.ElementType;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
          <span className="text-xs font-medium" style={{ color: themeColors.textSecondary }}>{label}</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{
          backgroundColor: themeColors.promptBg,
          color: themeColors.textPrimary
        }}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={settingsLocked}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${themeColors.accent} 0%, ${themeColors.accent} ${value}%, ${themeColors.inputBackground} ${value}%, ${themeColors.inputBackground} 100%)`,
        }}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen pb-52 transition-colors duration-300"
      style={{ backgroundColor: themeColors.background }}
    >
      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-6 h-6" style={{ color: themeColors.accent }} />
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: themeColors.textPrimary }}>
              AI Prompt Studio
            </h1>
          </div>
          <p className="text-sm" style={{ color: themeColors.textTertiary }}>
            Multi-model prompt generator with visual presets
          </p>

          {/* Theme & Lock Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.borderColor,
                color: themeColors.textSecondary
              }}
            >
              {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {darkMode ? 'Light' : 'Dark'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettingsLocked(!settingsLocked)}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: settingsLocked ? themeColors.warning + '20' : themeColors.inputBackground,
                borderColor: settingsLocked ? themeColors.warning : themeColors.borderColor,
                color: settingsLocked ? themeColors.warning : themeColors.textSecondary
              }}
            >
              {settingsLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              {settingsLocked ? 'Locked' : 'Lock'}
            </motion.button>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor,
            boxShadow: darkMode ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="p-5 space-y-1">
            {/* Model Selector */}
            <div>
              <SectionHeader title="AI Model" icon={Layers} sectionKey="model" />
              <AnimatePresence>
                {expandedSections.model && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4">
                      {(Object.entries(modelConfigs) as [AIModel, ModelConfig][]).map(([key, config]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => !settingsLocked && setSelectedModel(key)}
                          disabled={settingsLocked}
                          className="p-3 rounded-xl text-left transition-all border"
                          style={{
                            backgroundColor: selectedModel === key ? themeColors.promptBg : 'transparent',
                            borderColor: selectedModel === key ? themeColors.accent : themeColors.borderColor,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{config.icon}</span>
                            <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                              {config.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Subject & Characters */}
            <div className="py-3 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                  Subject (Main Focus)
                </label>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="A futuristic warrior standing on a cliff..."
                  rows={2}
                  className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.textPrimary,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: themeColors.textTertiary }}>
                  <User className="w-3 h-3" /> Characters
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentCharacter}
                    onChange={(e) => setCurrentCharacter(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCharacter()}
                    placeholder="Add character description..."
                    disabled={settingsLocked}
                    className="flex-1 rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      border: `1px solid ${themeColors.inputBorder}`,
                      color: themeColors.textPrimary,
                      opacity: settingsLocked ? 0.6 : 1
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addCharacter}
                    disabled={settingsLocked}
                    className="px-3 rounded-lg"
                    style={{
                      backgroundColor: themeColors.accent,
                      color: '#fff',
                      opacity: settingsLocked ? 0.6 : 1
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                {characterItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {characterItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
                        style={{
                          backgroundColor: themeColors.promptBg,
                          color: themeColors.textPrimary,
                          border: `1px solid ${themeColors.borderColor}`
                        }}
                      >
                        <User className="w-3 h-3" style={{ color: themeColors.accent }} />
                        <span className="max-w-[150px] truncate">{item.content}</span>
                        <button
                          onClick={() => removeCharacter(item.id)}
                          disabled={settingsLocked}
                          className="ml-1 hover:opacity-70"
                        >
                          <X className="w-3 h-3" style={{ color: themeColors.textTertiary }} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: themeColors.textTertiary }}>
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., neon-lit Tokyo street at night"
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: themeColors.inputBackground,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.textPrimary,
                    opacity: settingsLocked ? 0.6 : 1
                  }}
                />
              </div>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Atmosphere Menu */}
            <div>
              <SectionHeader
                title="Atmosphere"
                icon={Sun}
                sectionKey="atmosphere"
                badge={selectedAtmosphere ? atmosphereConfigs[selectedAtmosphere].name : undefined}
              />
              <AnimatePresence>
                {expandedSections.atmosphere && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4">
                      {(Object.entries(atmosphereConfigs) as [Atmosphere, AtmosphereConfig][]).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => !settingsLocked && setSelectedAtmosphere(selectedAtmosphere === key ? null : key)}
                          disabled={settingsLocked}
                          className="relative p-3 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            borderColor: selectedAtmosphere === key ? themeColors.accent : themeColors.borderColor,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          {/* Background Gradient Preview */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{ background: config.gradient }}
                          />
                          <div className="relative z-10">
                            <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                              {config.name}
                            </span>
                            {selectedAtmosphere === key && (
                              <Check className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.accent }} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Visual Presets */}
            <div>
              <SectionHeader
                title="Visual Style"
                icon={ImageIcon}
                sectionKey="visual"
                badge={selectedVisualPreset ? visualPresets[selectedVisualPreset].name : undefined}
              />
              <AnimatePresence>
                {expandedSections.visual && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 pb-4">
                      {Object.entries(visualPresets).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => !settingsLocked && setSelectedVisualPreset(selectedVisualPreset === key ? null : key)}
                          disabled={settingsLocked}
                          className="relative p-3 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            borderColor: selectedVisualPreset === key ? themeColors.accent : themeColors.borderColor,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{ background: config.gradient }}
                          />
                          <div className="relative z-10">
                            <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                              {config.name}
                            </span>
                            {selectedVisualPreset === key && (
                              <Check className="absolute top-2 right-2 w-4 h-4" style={{ color: themeColors.accent }} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px" style={{ backgroundColor: themeColors.borderColor }} />

            {/* Camera & Lens */}
            <div>
              <SectionHeader title="Camera & Lens" icon={Camera} sectionKey="camera" />
              <AnimatePresence>
                {expandedSections.camera && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-4">
                      {/* Camera Type Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Camera</label>
                        <select
                          value={selectedCamera}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setSelectedCamera(e.target.value);
                              setCustomCamera('');
                            }
                          }}
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          <option value="">No specific camera</option>
                          {cameraOptions.map(camera => (
                            <option key={camera.label} value={camera.label}>{camera.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={customCamera}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setCustomCamera(e.target.value);
                            }
                          }}
                          placeholder="Or enter custom camera (e.g., Canon 5D)"
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        />
                      </div>

                      {/* Lens Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Lens</label>
                        <select
                          value={selectedLens}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setSelectedLens(e.target.value);
                              setCustomLens('');
                            }
                          }}
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          {lensOptions.map(lens => (
                            <option key={lens} value={lens}>{lens}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={customLens}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setCustomLens(e.target.value);
                            }
                          }}
                          placeholder="Or enter custom lens (e.g., 21mm Zeiss)"
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        />
                      </div>

                      {/* Shot Type Selection */}
                      <div>
                        <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>Shot Type</label>
                        <select
                          value={selectedShot}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setSelectedShot(e.target.value);
                              setCustomShot('');
                            }
                          }}
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          {shotOptions.map(shot => (
                            <option key={shot.label} value={shot.label}>{shot.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={customShot}
                          onChange={(e) => {
                            if (!settingsLocked) {
                              setCustomShot(e.target.value);
                            }
                          }}
                          placeholder="Or enter custom shot type"
                          disabled={settingsLocked}
                          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: themeColors.inputBackground,
                            border: `1px solid ${themeColors.inputBorder}`,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Advanced Tools Drawer */}
        <motion.div
          className="rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor,
          }}
        >
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" style={{ color: themeColors.accent }} />
              <span className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                Advanced Tools
              </span>
            </div>
            <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-4">
                  {/* Negative Prompt */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                      Negative Prompt (Things to Avoid)
                    </label>
                    <textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="blurry, low quality, distorted, watermark..."
                      rows={2}
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: themeColors.inputBackground,
                        border: `1px solid ${themeColors.inputBorder}`,
                        color: themeColors.textPrimary,
                        opacity: settingsLocked ? 0.6 : 1
                      }}
                    />
                    <p className="text-xs mt-1" style={{ color: themeColors.textTertiary }}>
                      Uses {modelConfigs[selectedModel].negativeParam} for {modelConfigs[selectedModel].name}
                    </p>
                  </div>

                  {/* Creative Controls Section */}
                  <div
                    className="p-3 rounded-xl border space-y-4"
                    style={{
                      backgroundColor: themeColors.inputBackground,
                      borderColor: themeColors.borderColor,
                      opacity: creativeControlsEnabled ? 1 : 0.6
                    }}
                  >
                    {/* Toggle Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeColors.textPrimary }}>
                          Creative Controls
                        </p>
                        <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                          Add stylize, chaos, CFG params to prompt
                        </p>
                      </div>
                      <button
                        onClick={() => !settingsLocked && setCreativeControlsEnabled(!creativeControlsEnabled)}
                        disabled={settingsLocked}
                        className="relative w-11 h-6 rounded-full transition-colors"
                        style={{
                          backgroundColor: creativeControlsEnabled ? themeColors.accent : themeColors.borderColor,
                          opacity: settingsLocked ? 0.6 : 1
                        }}
                      >
                        <div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                          style={{
                            transform: creativeControlsEnabled ? 'translateX(24px)' : 'translateX(4px)'
                          }}
                        />
                      </button>
                    </div>

                    {/* Sliders */}
                    {creativeControlsEnabled && (
                      <div className="space-y-3 pt-2 border-t" style={{ borderColor: themeColors.borderColor }}>
                        <UniversalSlider
                          label="Creativity"
                          value={creativity}
                          onChange={setCreativity}
                          icon={Sparkles}
                        />
                        <UniversalSlider
                          label="Variation"
                          value={variation}
                          onChange={setVariation}
                          icon={Layers}
                        />
                        <UniversalSlider
                          label="Uniqueness"
                          value={uniqueness}
                          onChange={setUniqueness}
                          icon={Zap}
                        />
                        <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                          Auto-translated to {modelConfigs[selectedModel].name} parameters
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Depth of Field */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: themeColors.textTertiary }}>
                      Depth of Field
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {dofOptions.map(dof => (
                        <button
                          key={dof.value}
                          onClick={() => !settingsLocked && setDepthOfField(dof.value)}
                          disabled={settingsLocked}
                          className="p-2.5 rounded-lg text-xs text-left transition-all border"
                          style={{
                            backgroundColor: depthOfField === dof.value ? themeColors.promptBg : 'transparent',
                            borderColor: depthOfField === dof.value ? themeColors.accent : themeColors.borderColor,
                            color: themeColors.textPrimary,
                            opacity: settingsLocked ? 0.6 : 1
                          }}
                        >
                          {dof.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* User Presets Placeholder */}
                  <div
                    className="p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: themeColors.borderColor }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bookmark className="w-4 h-4" style={{ color: themeColors.textTertiary }} />
                      <span className="text-sm font-medium" style={{ color: themeColors.textSecondary }}>
                        User Presets
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        backgroundColor: themeColors.warning + '20',
                        color: themeColors.warning
                      }}>
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: themeColors.textTertiary }}>
                      Save your favorite combinations for quick access
                    </p>
                    {savedPresets.length === 0 && (
                      <button
                        disabled
                        className="mt-3 w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 opacity-50"
                        style={{
                          backgroundColor: themeColors.inputBackground,
                          color: themeColors.textTertiary
                        }}
                      >
                        <Save className="w-3 h-3" />
                        Save Current Settings
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sticky Output Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-xl z-50"
        style={{
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.borderColor,
        }}
      >
        <div className="max-w-[480px] mx-auto p-4">
          {/* Live Preview */}
          <div
            className="rounded-xl p-3 mb-3 max-h-24 overflow-y-auto"
            style={{
              backgroundColor: themeColors.promptBg,
              border: `1px solid ${themeColors.borderColor}`,
            }}
          >
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: themeColors.accent }} />
              <p
                className="text-xs font-mono leading-relaxed"
                style={{ color: themeColors.textPrimary }}
              >
                {generatePrompt()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetAll}
              disabled={settingsLocked}
              className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border"
              style={{
                backgroundColor: 'transparent',
                borderColor: themeColors.borderColor,
                color: themeColors.textSecondary,
                opacity: settingsLocked ? 0.6 : 1
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyToClipboard}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              style={{
                backgroundColor: copied ? themeColors.success : themeColors.accent,
                color: '#fff'
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
