import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

const LEVELS = [
  'Starter',
  'Beginner',
  'LowerIntermediate',
  'Intermediate',
  'Advanced',
  'Professional',
];

const SelectSportLevel = ({
  visible,
  currentLevel,
  onSave,
  onClose,
  openEditSport,
  setOpenEditSport,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  const [selectedLevel, setSelectedLevel] = useState(currentLevel);

  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => {
            onClose()
            setOpenEditSport(!openEditSport)
        }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.sheet}>
              <Text style={styles.title}>{t('changeLevel')}</Text>

              {LEVELS.map(level => {
                const checked = selectedLevel === level;

                return (
                  <TouchableOpacity
                    key={level}
                    style={styles.row}
                    onPress={() => setSelectedLevel(level)}
                  >
                    <Text style={ checked == true ? [{fontWeight:800} ,styles.levelText] : styles.levelText}>
                      {t(level)}
                    </Text>

                    <View style={styles.checkbox}>
                      {checked && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color={theme.colors.primary}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* ACTION BUTTONS */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    onClose()
                    setOpenEditSport(!openEditSport)
                  }}
                >
                  <Text style={styles.cancelText}>
                    {t('cancelEditProfile')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => {
                    if (selectedLevel) {
                      onSave(selectedLevel);
                    }
                    onClose()
                    setOpenEditSport(!openEditSport)
                  }}
                >
                  <Text style={styles.saveText}>
                    {t('saveEditProfile')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectSportLevel;

/* ================= STYLES ================= */

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
    },
    levelText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.border || '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      padding:10
    },
    cancelBtn: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.colors.border || '#ccc',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelText: {
      color: theme.colors.text,
      fontWeight: '500',
    },
    saveBtn: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveText: {
      color: theme.colors.buttonText,
      fontWeight: '600',
    },
  });
