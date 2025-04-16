import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./menuCards.module.css";

const MenuCards = () => {
  const { t, i18n } = useTranslation();
  const [menus, setMenus] = useState([]);

  // Load translations after component mounts
  useEffect(() => {
    const loadedMenus = [
      { title: t("test1"), desc: t("desc1"), link: "/layout-style" },
      { title: t("test2"), desc: t("desc2"), link: "/connect-api" },
      { title: t("test3"), desc: t("desc3"), link: "/form-table" },
    ];
    setMenus(loadedMenus);
  }, [i18n.language]); // Re-run when language changes

  return (
    <div className={styles.menuContainer}>
      {menus.map((menu, idx) => (
        <Link href={menu.link} key={idx} className={styles.cardLink}>
          {/* Use updated API for Card styles */}
          <Card
            title={<span suppressHydrationWarning>{menu.title}</span>}
            className={styles.menuCard}
            hoverable
            styles={{
              header: {
                fontWeight: 500,
                textAlign: "center",
                borderBottom: "1px solid #f0f0f0",
              },
              body: {
                minHeight: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <span suppressHydrationWarning>{menu.desc}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MenuCards;